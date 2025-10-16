import { Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list.component';
import { UserFormComponent } from './users/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent, title: 'Benutzer' },
  { path: 'new', component: UserFormComponent, title: 'Neuer Benutzer' },
  { path: '**', redirectTo: 'users' }
];