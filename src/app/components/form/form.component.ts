import { Component, inject } from "@angular/core";
import { User } from "../../interfaces/user.interface";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AppService } from "../../app.service";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [ReactiveFormsModule, ButtonComponent]
})
export class FormComponent {
  fb: FormBuilder = inject(FormBuilder);
  public appService = inject(AppService);

  form: FormGroup = this.fb.group({
    name: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      },
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
    console.log(this.form.value);
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