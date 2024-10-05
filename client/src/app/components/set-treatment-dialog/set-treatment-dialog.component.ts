import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Treatment{
  treatment:string | null;
  start:Date | null;
  end:Date | null;
}

@Component({
  selector: 'app-set-treatment-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './set-treatment-dialog.component.html',
  styleUrl: './set-treatment-dialog.component.css'
})
export class SetTreatmentDialogComponent {

  readonly dialogRef = inject(MatDialogRef<SetTreatmentDialogComponent>);
  readonly matSnackBar = inject(MatSnackBar);
  readonly data = inject<Treatment[]>(MAT_DIALOG_DATA);

  oldTreatments:Treatment[] = []
  treatments:Treatment[] = this.data;


  constructor() {
    for (const element of this.data) {
      this.oldTreatments.push({
        treatment: element.treatment,
        start: element.start,
        end: element.end,
      });
    }    
  }

  remove = (index:number):void =>{
    if(this.treatments.length == 1){
      this.treatments = [{
        treatment: null,
        start: null,
        end: null,
      }];
    }
    else{
      this.treatments.splice(index,1);
    }
  }

  add = ():void =>{

    for (const element of this.treatments) {
      if (!element.treatment || !element.end) {
        this.matSnackBar.open('Заповніть або видаліть пусті поля', '', {
          duration: 3000,
          horizontalPosition: 'center',
        });
        return;
      }
    }

    this.treatments.push({
      treatment: null,
      start: null,
      end: null,
    });
  }

  onClear = ():void =>{
    this.treatments = [{
      treatment: null,
      start: null,
      end: null,
    }]
  }

  onCancel = ():void =>{
    this.dialogRef.close(this.oldTreatments);
  }

  onSubmit = (): void => {

    if (this.treatments.length == 1 && !this.treatments[0].treatment && !this.treatments[0].end) {
      this.dialogRef.close(this.treatments);
      return;
    }

    for (const element of this.treatments) {
      if (!element.treatment || !element.end) {
        this.matSnackBar.open('Заповніть або видаліть пусті поля', '', {
          duration: 3000,
          horizontalPosition: 'center',
        });
        return;
      }
    }

    this.dialogRef.close(this.treatments);
  }
}
