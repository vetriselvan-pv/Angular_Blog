import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from "@angular/forms/signals";

export interface IPersonalDetail {
  fullName : string,
  age : number | string ,
  dob : string ,
  nickName : string
}

@Component({
  selector: 'app-form',
  imports: [FormField],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  personalDetail = signal<IPersonalDetail>({
    age : '',
    dob : '',
    fullName : '',
    nickName : ''
  });

  personalDetailform = form(this.personalDetail,(path) => {
    required(path.fullName, {
      message : 'Full Name is required'
    }),
    required(path.age, {
      message : 'Age is required'
    }),
    required(path.dob, {
      message : 'Dob is required'
    }),
    validate(path.age, ({value}) => {
        return value() && typeof value() === 'string' && Number(value()) < 18 ? {
          kind : 'minage',
          message : 'Age should be greater than 18'
        } : null
    })
  });
  
  onFormSubmit(event:Event){
    event.preventDefault();
    console.log(this.personalDetailform().value())
  }
}
