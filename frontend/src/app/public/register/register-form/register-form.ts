import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  protected formGroup = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(55),
      ],
      updateOn: 'change',
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      updateOn: 'change',
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
        ),
      ],
      updateOn: 'change',
    }),
    age: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('/[^0-9]{1,2}'),
        Validators.minLength(1),
        Validators.maxLength(3),
      ],
      updateOn: 'change',
    }),
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('^0[(6|7)][0-9]{8}$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    }),
    role: new FormControl('user', { nonNullable: true }),
  });

  protected formData = output<FormGroup>();

  protected submit() {
    this.formData.emit(this.formGroup);
    this.formGroup.reset();
  }
}
