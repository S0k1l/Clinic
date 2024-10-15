import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { confirmPasswordValidator, passwordValidator,  } from '../../validators/password-validator';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

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

  register(){
    const registrationData = {
      ...this.registrationData.value,
      ...this.personalData.value,
      ...this.medicalData.value
    };
    console.log(registrationData);
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
      bloodType: ['', Validators.required],
      bDay: ['', Validators.required],
      sex: ['', Validators.required],
    });
  }
}
