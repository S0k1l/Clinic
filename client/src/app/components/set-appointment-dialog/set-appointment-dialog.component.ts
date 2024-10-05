import { AfterViewInit, Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule, MatListOption} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

interface Doctors {
  value: string;
  spec: string;
  name: string;
}

interface InputData {
  id: string | null;
  date: Date | null;
}

@Component({
  selector: 'app-set-appointment-dialog',
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
    CommonModule
  ],
  templateUrl: './set-appointment-dialog.component.html',
  styleUrl: './set-appointment-dialog.component.css'
})

export class SetAppointmentDialogComponent implements AfterViewInit {

  showComponent = true;

  @ViewChildren('listOption') listOptions!: QueryList<MatListOption>;

  readonly dialogRef = inject(MatDialogRef<SetAppointmentDialogComponent>);
  readonly matSnackBar = inject(MatSnackBar);
  readonly data = inject<InputData>(MAT_DIALOG_DATA);

  inputData:InputData = this.data

  doctorName: string | null = null;
  date:Date | null = this.inputData.date;

  selected = 'all';

  form: FormGroup;
  doctorsControl: FormControl;

  doctors: Doctors[] = [
    { value: 'boots', name: 'Боржієвський Олександр Анатолійович', spec: 'Лікар з ультразвукової діагностики серця (УЗД)' },
    { value: 'clogs', name: 'Clogs', spec: 'Сімейний лікар' },
    { value: 'loafers', name: 'Loafers', spec: 'Сімейний лікар' },
    { value: 'moccasins', name: 'Moccasins', spec: 'Сімейний лікар' },
    { value: 'sneakers', name: 'Sneakers', spec: 'Сімейний лікар' },
  ];


  constructor() {
    this.doctorsControl = new FormControl([this.inputData.id]);

    this.form = new FormGroup({
      doctorsControl: this.doctorsControl,
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.scrollToSelectedOption(), 300);
  }

  scrollToSelectedOption() {
    if(this.inputData.id){
      console.log(this.inputData.id)
      const el = document.getElementById(this.inputData.id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }

  onClear = (): void => {
    this.doctorName = null;
    this.selected = 'all'

    this.inputData = {
      id: null,
      date: null,
    };
    
    this.date = null;
    this.doctorsControl = new FormControl();

    this.form = new FormGroup({
      doctorsControl: this.doctorsControl,
    });
  }

  onCancel= (): void => {
    this.dialogRef.close(this.inputData);
  }

  onSubmit = (): void => {
    this.inputData.id = this.doctorsControl.value ? this.doctorsControl.value[0] : null
    this.inputData.date = this.date;

    if(!this.inputData.id && this.inputData.date){
      this.matSnackBar.open('Оберіть лікаря', '', {
        duration: 3000,
        horizontalPosition: 'center',
      });
      return;
    }
    
    if(!this.inputData.date && this.inputData.id){
      this.matSnackBar.open('Оберіть дату', '', {
        duration: 3000,
        horizontalPosition: 'center',
      });
      return;
    }
    this.dialogRef.close(this.inputData);
  }
}