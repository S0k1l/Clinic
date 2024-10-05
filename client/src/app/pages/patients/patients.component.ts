import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SetAppointmentDialogComponent } from '../../components/set-appointment-dialog/set-appointment-dialog.component';
import { SetTreatmentDialogComponent } from '../../components/set-treatment-dialog/set-treatment-dialog.component';
import { SetDiagnoseDialogComponent } from '../../components/set-diagnose-dialog/set-diagnose-dialog.component';
import { MatDivider } from '@angular/material/divider';

interface Treatment{
  treatment:string | null;
  start:Date | null;
  end:Date | null;
}

interface InputData {
  id: string | null;
  date: Date | null;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    MatExpansionModule, 
    MatInputModule, 
    MatCheckboxModule,
    FormsModule, 
    CommonModule,
    MatButtonModule,
    MatDivider,
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  panels = [
    {
      time: '09:00 - 09:20',
      name: 'Дзера Надія Богданівна',
      isDiagnosisChecked: false,
      isTreatmentChecked: false,
    },
    {
      time: '09:20 - 09:40',
      name: 'Some Other Name',
      isDiagnosisChecked: false,
      isTreatmentChecked: false,
    }
  ];

  treatments:Treatment[] = [{
    treatment: null,
    start: null,
    end: null,
  }];

  inputData:InputData = {
    id: null,
    date: null,
  }

  diagnose:string | null = null;

  constructor(public dialog: MatDialog) {}

  setAppointment(): void {
    const dialogRef = this.dialog.open(SetAppointmentDialogComponent, {
      width: '1000px',
      disableClose: true,
      data: this.inputData,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inputData = result;
      console.log('Dialog closed, input value: ', result);
    });
  }

  setTreatment(): void {
    const dialogRef = this.dialog.open(SetTreatmentDialogComponent, {
      data: this.treatments,
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.treatments = result;
      console.log('Dialog closed, input value: ', result);
    });
  }

  setDiagnose(): void {
    const dialogRef = this.dialog.open(SetDiagnoseDialogComponent, {
      data: this.diagnose,
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.diagnose = result;
      console.log('Dialog closed, input value: ', result);
    });
  }
}