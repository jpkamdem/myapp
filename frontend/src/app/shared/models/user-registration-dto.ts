import { WritableSignal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface registerFormType {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  age: FormControl<string>;
  phoneNumber: FormControl<string>;
  role: FormControl<string>;
}

export class UserRegistrationDTO {
  #username: WritableSignal<string> = signal('');
  #email: WritableSignal<string> = signal('');
  #password: WritableSignal<string> = signal('');
  #age: WritableSignal<string> = signal('');
  #phoneNumber: WritableSignal<string> = signal('');
  #role: WritableSignal<string> = signal('user');

  constructor(
    username: string,
    email: string,
    password: string,
    age: string,
    phoneNumber: string,
    role: string
  ) {
    this.username = username;

    this.#validEmail(email);
    this.email = email;

    this.#validPassword(password);
    this.password = password;

    this.#validAge(age);
    this.age = age;

    this.#validPhoneNumber(phoneNumber);
    this.phoneNumber = phoneNumber;

    this.#validRole(role);
    this.role = role;
  }

  #roles = ['user', 'admin', 'superadmin'];

  #validEmail(value: string) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    const check = emailRegex.test(value);
    if (!check) {
      throw new Error('Adresse mail invalide');
    }

    return check;
  }

  #validPassword(value: string) {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const check = passwordRegex.test(value);
    if (!check) {
      throw new Error('Mot de passe invalide');
    }
  }

  #validAge(value: string) {
    const ageRegex = /^[1-9][0-9]{0,2}$/;
    const check = ageRegex.test(value);
    if (!check) {
      throw new Error('Âge invalide');
    }
  }

  #validPhoneNumber(value: string) {
    const phoneNumberRegex = /^0[67][0-9]{8}$/;
    const check = phoneNumberRegex.test(value);
    if (!check) {
      throw new Error('Numéro de téléphone invalide');
    }
  }

  #validRole(value: string) {
    const check = this.#roles.includes(value);
    if (!check) {
      throw new Error('Rôle invalide');
    }

    return check;
  }

  get username() {
    return this.#username();
  }

  set username(value: string) {
    this.#username.set(value);
  }

  get email() {
    return this.#email();
  }

  set email(value: string) {
    this.#validEmail(value);
    this.#email.set(value);
  }

  get password() {
    return this.#password();
  }

  set password(value: string) {
    this.#validPassword(value);
    this.#password.set(value);
  }

  get age() {
    return this.#age();
  }

  set age(value: string) {
    this.#validAge(value);
    this.#age.set(value);
  }

  get phoneNumber() {
    return this.#phoneNumber();
  }

  set phoneNumber(value: string) {
    this.#validPhoneNumber(value);
    this.#phoneNumber.set(value);
  }

  get role() {
    return this.#role();
  }

  set role(value: string) {
    this.#validRole(value);
    this.#role.set(value);
  }
}
