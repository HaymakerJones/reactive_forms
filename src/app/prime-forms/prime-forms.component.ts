import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prime-forms',
  templateUrl: './prime-forms.component.html',
  styleUrls: ['./prime-forms.component.css']
})
export class PrimeFormsComponent implements OnInit {

  userForm: FormGroup;
  formErrors = {
    name: '',
    emails: [
      { address: '' }
    ]
  };
  validationMessages = {
    name: {
      required: 'Name is required'
    },
    emails: {
      address: {
        required: 'Email required',
        format: 'Invalid email format'
      }
    }
  };

  constructor(@Inject(FormBuilder) private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      emails: this.fb.array([
        this.createEmail()
      ]),
    });

    //Look for changes
    this.userForm.valueChanges.subscribe(
      data => this.validateForm()
    );
  }

  validateForm() {
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let input = this.userForm.get(field);

      if (input.invalid && input.dirty) {
        for (let error in input.errors) {
          this.formErrors[field] = this.validateForm[field][error];
        }
      }
    }

    this.validateEmails();
  }

  validateEmails() {
    let emails = <FormArray>this.userForm.get('emails');

    this.formErrors.emails = [];
    for (let i = 1; i <= emails.length; i++) {
      this.formErrors.emails.push({ address: '' });
      let email = <FormGroup>emails.at(i - 1);

      for (let field in email.controls) {
        let input = email.get(field);
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.emails[i - 1][field] = this.validationMessages.emails[field][error];
          }
        }
      }
    }
  }

  createEmail() {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  addEmail() {
    let emails = <FormArray>this.userForm.get('emails');
    emails.push(this.createEmail());
  }

  removeEmail(index: number) {
    let emails = <FormArray>this.userForm.get('emails');
    emails.removeAt(index);
  }

  onSubmit(f: FormGroup) {
    console.log(f);
  }

}
