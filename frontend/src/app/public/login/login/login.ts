import { Component, inject } from '@angular/core';
import {
  loginFormType,
  UserLoginDTO,
} from '../../../shared/models/user-login-dto';
import { ApiService } from '../../../shared/services/api-service';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  providers: [ApiService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly #apiService = inject(ApiService);

  protected getFormData(event: loginFormType) {
    const user = new UserLoginDTO(event.identifier.value, event.password.value);
    this.#apiService.sendLoginForm(user);
  }
}
