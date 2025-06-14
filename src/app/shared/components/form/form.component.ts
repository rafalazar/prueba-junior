import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { AppService } from '../../../app.service';
import { User } from '../../../interfaces/user.interface';
import { ErrorMessagesInputDirective } from '../../directives/form/error-messages-input.directive';
import { FormInputStyleDirective } from '../../directives/form/form-input-style.directive';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [
    ReactiveFormsModule,
    FormInputStyleDirective,
    ErrorMessagesInputDirective,
    ButtonComponent
  ]
})
export class FormComponent {
  fb: FormBuilder = inject(FormBuilder);
  public appService = inject(AppService);

  form: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ],
    ],
    surname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
  });

  get hasAnyValue(): boolean {
    const { name, surname, email } = this.form.value;
    return !!(name || surname || email);
  }

  handleClear() {
    this.form.reset();
  }

  handleSubmit() {
    const { name, surname, email } = this.form.value;
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      surname,
      email,
    };

    this.appService.addNewUser(newUser);
    this.form.reset();
  }
}