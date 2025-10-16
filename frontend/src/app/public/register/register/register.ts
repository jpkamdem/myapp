import { Component, inject } from '@angular/core';
import { registerFormType, UserRegistrationDTO } from '../../../shared/models/user-registration-dto';
import { ApiService } from '../../../shared/services/api-service';
import { RegisterForm } from '../register-form/register-form';

@Component({
  selector: 'app-register',
  imports: [RegisterForm],
  providers: [ApiService],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly #apiService = inject(ApiService);

  getFormData(event: registerFormType) {
    const registedUser: UserRegistrationDTO = new UserRegistrationDTO(
      event.username.value,
      event.email.value,
      event.password.value,
      event.age.value,
      event.phoneNumber.value,
      event.role.value
    );

    this.#apiService.sendRegisterForm(registedUser);
  }
}
