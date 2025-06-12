import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
})
export class DatatableComponent {
  users = input.required<User[]>();
}
