import { Injectable, signal } from '@angular/core';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _users = signal<User[]>([
    { id: 1, name: 'Max Hoffmann', email: 'max@example.com', role: 'Employee', active: true },
    { id: 2, name: 'Jenn Muster', email: 'jenn@example.com', role: 'Manager', active: true },
    { id: 3, name: 'Ali Veli', email: 'ali@example.com', role: 'Employee', active: false },
    { id: 3, name: 'Banu Nur', email: 'banu@example.com', role: 'Employee', active: false }
  ]);

  users = this._users.asReadonly();

  add(user: Omit<User, 'id'>) {
    const id = Math.max(0, ...this._users().map(u => u.id)) + 1;
    this._users.update(arr => [...arr, { id, ...user }]);
  }

  filter(term: string) {
    const t = term.toLowerCase();
    return this._users().filter(u => u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t));
  }
}