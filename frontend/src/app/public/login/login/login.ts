import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected getFormData($event: FormGroup) {}
}
