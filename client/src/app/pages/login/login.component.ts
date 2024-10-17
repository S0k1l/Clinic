import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { passwordValidator } from '../../validators/password-validator';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  form!:FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  login(){
    this.authService.login(this.form.value)
      .subscribe({
        next: (response) => {
          this.matSnackBar.open(response.message, 'Закрити', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.matSnackBar.open(error.error.message, 'Закрити', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        },
      })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6), passwordValidator]],
    });
  }
  
}
