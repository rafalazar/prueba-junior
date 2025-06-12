import { Injectable, signal } from '@angular/core';
import { User } from './interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AppService {
  users = signal<User[]>([]);

  addNewUser(newUser: User) {
    this.users.update((list) => [...list, newUser]);
  }
}
