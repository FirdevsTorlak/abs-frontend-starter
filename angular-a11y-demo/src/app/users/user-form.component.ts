import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  errorMsg = signal('');
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['Employee', Validators.required],
    active: [true]
  });

  constructor(private fb: FormBuilder, private svc: UsersService, private router: Router) {}

  submit() {
    if (this.form.invalid) {
      this.errorMsg.set('Bitte prüfen Sie die Eingaben.');
      return;
    }
    const { name, email, role, active } = this.form.value;
    this.svc.add({ name: name!, email: email!, role: role as any, active: !!active });
    this.router.navigateByUrl('/users');
  }
}