import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { passwordValidator } from '../../validators/password-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  form!:FormGroup;
  fb = inject(FormBuilder);

  login(){
    console.log('hi')
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6), passwordValidator]],
    });
  }
  
}
