import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

interface Treatment{
  treatment:string | null;
  start:Date | null;
  end:Date | null;
}

interface MedicalRecord{
  id: string;
  doctor: string;
  date: Date;
  treatment: Treatment[] | null;
  diagnose: string | null;
}

@Component({
  selector: 'app-medical-record-details-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    CommonModule,
    MatDivider
  ],
  templateUrl: './medical-record-details-dialog.component.html',
  styleUrl: './medical-record-details-dialog.component.css'
})
export class MedicalRecordDetailsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MedicalRecordDetailsDialogComponent>);
  readonly data = inject<MedicalRecord | null>(MAT_DIALOG_DATA);

  info:MedicalRecord | null = this.data

  onExit =():void =>{
    this.dialogRef.close();
  }
}
