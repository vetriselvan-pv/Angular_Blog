import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, validate, validateAsync, validateTree } from '@angular/forms/signals';
import { of } from 'rxjs';

export interface IPersonalDetail {
  fullName: string;
  age: number | string;
  dob: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

@Component({
  selector: 'app-form',
  imports: [FormField, JsonPipe],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  personalDetail = signal<IPersonalDetail>({
    age: '',
    dob: '',
    fullName: '',
    nickName: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  personalDetailform = form(this.personalDetail, (path) => {
    (required(path.fullName, {
      message: 'Full Name is required',
    }),
      required(path.age, {
        message: 'Age is required',
      }),
      required(path.dob, {
        message: 'Dob is required',
      }),
      validate(path.age, ({ value,  }) => {
        return value() && typeof value() === 'string' && Number(value()) < 18
          ? {
              kind: 'minage',
              message: 'Age should be greater than 18',
            }
          : null;
      }),
      validateTree(path.confirmPassword, ({ value, valueOf, fieldTreeOf  }) => {
        const password = valueOf(path.password);
        const confirm = value();
        if (password !== confirm) {
          return {
            field: fieldTreeOf(path.confirmPassword),
            kind: 'mismatch',
            message: 'Passwords do not match',
          };
        }
        return null;
      }));
      // validateAsync(path.fullName,{
      //   params : () =>  ({ fullName : path.fullName }),
      //   factory : ( ) => { 
      //     return 
      //   },
      //   onSuccess : (response) => response ? {kind : '', message : ''} : null
      // })
  });

  onFormSubmit(event: Event) {
    event.preventDefault();
    console.log(this.personalDetailform().value());
  }
}
