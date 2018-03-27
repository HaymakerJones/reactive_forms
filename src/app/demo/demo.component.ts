import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  testForm: FormGroup;

  formErrors = {
    name: '',
    addresses: [
      { city: '', country: '' }
    ]
  };

  validationMessages = {
    name: {
      required: 'Name is required'
    },
    addresses: {
      city: {
        required: 'City is required'
      },
      country: {
        required: 'Country is required'
      }
    }

  };

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.testForm = this.fb.group({
      name: ['', Validators.required],
      addresses: this.fb.array([
        this.createAddress()
      ])
    });

    //Watch for changes
    this.testForm.valueChanges.subscribe(
      data => this.validateForm()
    );
  }

  validateForm() {
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let input = this.testForm.get(field);

      if (input.invalid && input.dirty) {
        for (let error in input.errors) {
          this.formErrors[field] = this.validationMessages[field][error];
        }
      }
    }

    this.validateAddresses();
  }

  validateAddresses() {
    let addresses = <FormArray>this.testForm.get('addresses');
    this.formErrors.addresses = [];
    for (let i = 1; i <= addresses.length; i++) {
      this.formErrors.addresses.push({ city: '', country: '' });

      let address = <FormGroup>addresses.at(i - 1);

      for (let field in address.controls) {
        let input = address.get(field);
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.addresses[i - 1][field] = this.validationMessages.addresses[field][error]
          }
        }
      }
    }
  }

  removeAddress(index: number) {
    let addresses = <FormArray>this.testForm.get('addresses');
    addresses.removeAt(index);
  }

  createAddress() {
    return this.fb.group({
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  addAddress() {
    let addresses = <FormArray>this.testForm.get('addresses');
    addresses.push(this.createAddress());
  }

  onSubmit(f: FormGroup) {
    console.log(f);
  }

}
