import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeFormsComponent } from './prime-forms.component';

describe('PrimeFormsComponent', () => {
  let component: PrimeFormsComponent;
  let fixture: ComponentFixture<PrimeFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
