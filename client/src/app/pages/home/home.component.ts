import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SpecialtyService } from '../../services/specialty.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DoctorResponse } from '../../interfaces/doctor-response';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 1, transform: 'rotate(90deg)' })),
      transition(':enter, :leave', [
        animate(150)
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {

  selected = 0;
  doctorService = inject(DoctorService);
  specialtyService = inject(SpecialtyService);
  matSnackBar = inject(MatSnackBar);
  filter!:FormGroup;
  fb = inject(FormBuilder);
  doctors!:DoctorResponse[];
  specialty = this.specialtyService.getAll();

  
  clearDoctorName() {
    this.filter.get('doctorName')?.setValue('');
    this.search()
  }

  isDoctorNameEmpty():boolean{
    return this.filter.get('doctorName')?.value == '';
  }

  search = () => {
    this.doctorService.filter(this.filter.value).subscribe({
      next: (response) => {
        this.doctors = response
      },
      error: (err: HttpErrorResponse) =>
        this.matSnackBar.open(err!.error, 'Закрити', {
          duration: 5000,
          horizontalPosition: 'center',
        })
    });
    console.log(this.doctors);
  }

  ngOnInit(): void {
    this.filter = this.fb.group({
      specialtyId: [this.selected],
      doctorName: [''],
    });

    this.doctorService.getAll().subscribe({
      next: (response) => {
        this.doctors = response
      },
      error: (err: HttpErrorResponse) =>
        this.matSnackBar.open(err!.status == 0 ? "Проблема з сторони серверу" : err!.error, 'Закрити', {
          duration: 5000,
          horizontalPosition: 'center',
        })
    });
  }

}
