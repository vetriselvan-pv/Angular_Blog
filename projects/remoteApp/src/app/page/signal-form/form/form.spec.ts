import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form } from './form';

describe('Form', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Form],
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with initial value', () => {
    let formValue = component.personalDetailform().value();
    expect(formValue).toEqual({
      age: '',
      dob: '',
      fullName: '',
      nickName: '',
    });
  });

  it('should be invalid if the user not enter the value to full name', () => {
    const fullNameInput = fixture.nativeElement.querySelector('#fullName');
    fullNameInput.focus();
    fullNameInput.blur();
    fixture.detectChanges();
    expect(component.personalDetailform.fullName().errors()[0].kind).toEqual('required');
  });

  it('should be invalid if the age is less than 18', () => {
    component.personalDetailform.age().setControlValue('15');
    expect(component.personalDetailform.age().errors()[0].kind).toEqual('minage');
  });

  it('should show error message when user focus out without enter value in age', () => {
    const ageInput = fixture.nativeElement.querySelector('#age');
    ageInput.focus();
    ageInput.blur();
    fixture.detectChanges();
    const ageError = fixture.nativeElement.querySelector('#age_error_required');
    expect(ageError).toBeTruthy();
  });

  it('should show error message when user focus out without enter value in dob', () => {
    const ageInput = fixture.nativeElement.querySelector('#dob');
    ageInput.focus();
    ageInput.blur();
    fixture.detectChanges();
    const ageError = fixture.nativeElement.querySelector('#dob_error_required');
    expect(ageError).toBeTruthy();
  });

  it('should not show the error message on load', () => {
    fixture.detectChanges();
    const fullNameError = fixture.nativeElement.querySelector('fullname_error_required');
    const ageError = fixture.nativeElement.querySelector('age_error_required');
    const dobError = fixture.nativeElement.querySelector('dob_error_required');
    expect(fullNameError && ageError && dobError).toBeFalsy();
  });

  it('should have error', () => {
    fixture.detectChanges();
    const fullName = component.personalDetailform.fullName().errors();
    expect(fullName).toBeTruthy();
  });


  it('should trigger submit event ', () => {
    const submitEvent = vi.spyOn(component, 'onFormSubmit');
    const form : HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(submitEvent).toHaveBeenCalled();
  });
});
