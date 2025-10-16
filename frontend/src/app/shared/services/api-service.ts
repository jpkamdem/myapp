import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLoginDTO } from '../models/user-login-dto';
import { UserRegistrationDTO } from '../models/user-registration-dto';

@Injectable()
export class ApiService {
  readonly #http = inject(HttpClient);

  sendRegisterForm(user: UserRegistrationDTO) {
    this.#http
      .post(
        'http://127.0.0.1:4000/api/auth/register',
        {
          username: user.username,
          email: user.email,
          password: user.password,
          age: user.age,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
        {
          credentials: 'include',
          mode: 'cors',
          timeout: 10000,
          responseType: 'json',
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  sendLoginForm(user: UserLoginDTO) {
    this.#http
      .post(
        'http://127.0.0.1:4000/api/auth/login',
        {
          identifier: user.identifier,
          password: user.password,
        },
        {
          credentials: 'include',
          mode: 'cors',
          timeout: 10000,
          responseType: 'json',
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
