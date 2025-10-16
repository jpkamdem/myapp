import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  protected formGroup = new FormGroup({
    identifier: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
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
  });

  protected readonly formData = output<typeof this.formGroup.controls>();

  submit() {
    this.formData.emit({
      identifier: this.formGroup.controls.identifier,
      password: this.formGroup.controls.password,
    });

    this.formGroup.reset();
  }
}
