import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { DoctorDetailsResponse } from '../../interfaces/doctor-details-response';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    MatDividerModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterLink,
    AsyncPipe,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {

  @Input() id!:string;

  doctorService = inject(DoctorService);
  matSnackBar = inject(MatSnackBar);

  doctor!:DoctorDetailsResponse;

  ngOnInit(): void {
    this.doctorService.getDetails(this.id).subscribe({
      next: (data) =>{
        this.doctor = data
        this.doctor.birthDay = new Date(this.doctor.birthDay);
        this.doctor.employedSince = new Date(this.doctor.employedSince);
      },
      error: (err: HttpErrorResponse) =>{
        this.matSnackBar.open(err!.status == 0 ? "Проблема з сторони серверу" : err!.error, 'Закрити', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      }
    })
  }
}
