import { WritableSignal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface loginFormType {
  identifier: FormControl<string>;
  password: FormControl<string>;
}

export class UserLoginDTO {
  #identifier: WritableSignal<string> = signal('');
  #password: WritableSignal<string> = signal('');

  constructor(identifier: string, password: string) {
    this.identifier = identifier;

    this.#validPassword(password);
    this.password = password;
  }

  #validPassword(value: string) {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const check = passwordRegex.test(value);
    if (!check) {
      throw new Error('Mot de passe invalide');
    }
  }

  get identifier() {
    return this.#identifier();
  }

  set identifier(value: string) {
    this.#identifier.set(value);
  }

  get password() {
    return this.#password();
  }

  set password(value: string) {
    this.#validPassword(value);
    this.#password.set(value);
  }
}
