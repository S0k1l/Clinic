import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator, passwordValidator,  } from '../../validators/password-validator';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../interfaces/validation-error';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  hide:boolean = true;
  personalData!:FormGroup;
  registrationData!:FormGroup;
  medicalData!:FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);
  errors!: ValidationError[];


  register(){
    const registrationData = {
      ...this.registrationData.value,
      ...this.personalData.value,
      ...this.medicalData.value
    };

    this.authService.register(registrationData).subscribe({
      next: (response) =>{
        this.matSnackBar.open(response.message, 'Закрити', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/login']);
      },
      error: (err : HttpErrorResponse) =>{
        if (err!.status === 400) {
          this.matSnackBar.open(err!.error, 'Закрити', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      complete: () => console.log('Реєстрація успішна'),
    });
  }

  ngOnInit(): void {
    this.registrationData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: confirmPasswordValidator
    });
    this.personalData = this.fb.group({
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    this.medicalData = this.fb.group({
      birthDay: ['', Validators.required],
      isMale: ['', Validators.required],
      bloodType: ['', Validators.required],
    });
  }
}
