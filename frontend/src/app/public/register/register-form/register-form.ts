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
  protected readonly formGroup = new FormGroup({
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
    age: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[1-9]{1,3}')],
      updateOn: 'change',
    }),
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('^0[(6|7)][0-9]{8}$'),
      ],
      updateOn: 'change',
    }),
    role: new FormControl('user', { nonNullable: true }),
  });

  protected readonly formData = output<typeof this.formGroup.controls>();

  protected submit() {
    this.formData.emit({
      username: this.formGroup.controls.username,
      email: this.formGroup.controls.email,
      password: this.formGroup.controls.password,
      age: this.formGroup.controls.age,
      phoneNumber: this.formGroup.controls.phoneNumber,
      role: this.formGroup.controls.role,
    });

    this.formGroup.reset();
  }
}
