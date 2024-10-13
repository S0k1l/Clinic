import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MedicalRecordDetailsDialogComponent } from '../../components/medical-record-details-dialog/medical-record-details-dialog.component';
import { CommonModule } from '@angular/common';

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

const medicalRecords: MedicalRecord[] = [
  {
    id: 'MR001',
    doctor: 'Dr. Smith',
    date: new Date('2024-01-10'),
    treatment: [
      { treatment: 'Physical Therapy', start: new Date('2024-01-11'), end: new Date('2024-02-11') },
      { treatment: 'Painkillers', start: new Date('2024-01-10'), end: new Date('2024-01-20') },
    ],
    diagnose: 'Lower Back Pain',
  },
  {
    id: 'MR002',
    doctor: 'Dr. Johnson',
    date: new Date('2024-02-15'),
    treatment: [
      { treatment: 'Antibiotics', start: new Date('2024-02-16'), end: new Date('2024-03-02') },
    ],
    diagnose: 'Sinus Infection',
  },
  {
    id: 'MR003',
    doctor: 'Dr. Adams',
    date: new Date('2024-03-10'),
    treatment: [
      { treatment: 'Chemotherapy', start: new Date('2024-03-11'), end: new Date('2024-06-11') },
    ],
    diagnose: 'Lung Cancer',
  },
  {
    id: 'MR004',
    doctor: 'Dr. Lewis',
    date: new Date('2024-04-05'),
    treatment: [
      { treatment: 'Physical Therapy', start: new Date('2024-04-06'), end: new Date('2024-05-06') },
      { treatment: 'Chiropractic', start: new Date('2024-04-10'), end: new Date('2024-04-30') },
    ],
    diagnose: 'Neck Strain',
  },
  {
    id: 'MR005',
    doctor: 'Dr. Baker',
    date: new Date('2024-05-20'),
    treatment: [
      { treatment: 'Antihistamines', start: new Date('2024-05-21'), end: new Date('2024-05-25') },
    ],
    diagnose: 'Seasonal Allergies',
  },
  {
    id: 'MR006',
    doctor: 'Dr. Carter',
    date: new Date('2024-06-10'),
    treatment: [
      { treatment: 'Antidepressants', start: new Date('2024-06-11'), end: new Date('2024-07-11') },
    ],
    diagnose: 'Depression',
  },
  {
    id: 'MR007',
    doctor: 'Dr. Garcia',
    date: new Date('2024-07-15'),
    treatment: [
      { treatment: 'Steroids', start: new Date('2024-07-16'), end: new Date('2024-07-30') },
    ],
    diagnose: 'Asthma',
  },
  {
    id: 'MR008',
    doctor: 'Dr. Hall',
    date: new Date('2024-08-01'),
    treatment: [
      { treatment: 'Insulin Therapy', start: new Date('2024-08-02'), end: new Date('2024-12-02') },
    ],
    diagnose: 'Diabetes',
  },
  {
    id: 'MR009',
    doctor: 'Dr. Young',
    date: new Date('2024-09-05'),
    treatment: [
      { treatment: 'Radiation Therapy', start: new Date('2024-09-06'), end: new Date('2024-11-06') },
    ],
    diagnose: 'Breast Cancer',
  },
  {
    id: 'MR010',
    doctor: 'Dr. Green',
    date: new Date('2024-10-01'),
    treatment: [
      { treatment: 'Surgery', start: new Date('2024-10-02'), end: new Date('2024-10-10') },
    ],
    diagnose: 'Appendicitis',
  },
  {
    id: 'MR011',
    doctor: 'Dr. Cooper',
    date: new Date('2024-11-01'),
    treatment: [
      { treatment: 'Rehabilitation', start: new Date('2024-11-02'), end: new Date('2024-12-02') },
    ],
    diagnose: 'Knee Replacement',
  },
  {
    id: 'MR012',
    doctor: 'Dr. Campbell',
    date: new Date('2024-12-10'),
    treatment: [
      { treatment: 'Antiviral Medication', start: new Date('2024-12-11'), end: new Date('2024-12-20') },
    ],
    diagnose: 'Influenza',
  }
];

@Component({
  selector: 'app-patient',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ],
  imports: [
    MatDivider,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements AfterViewInit {

  bD = new Date('2003-02-26');
  age = new Date().getFullYear() - new Date('2003-02-26').getFullYear();

  dateStart:Date | null = null;
  dateEnd:Date | null = null;

  activeTreatments: Treatment[] = this.getActiveTreatments(medicalRecords);

  getActiveTreatments(records: MedicalRecord[]): Treatment[] {
    const today = new Date();
    const activeTreatments: Treatment[] = [];
  
    records.forEach(record => {
      if (record.treatment && record.treatment.length > 0) {

        const activeToday = record.treatment.filter(t => {
          const startValid = t.start && t.start <= today;
          const endValid = t.end && t.end >= today;
          return startValid && endValid;
        });
        activeTreatments.push(...activeToday);
      }
    });
    return activeTreatments;
  }

  user = {
    lastName: 'Боржієвський',
    firstName: 'Олександр',
    middleName: 'Анатолійович',
    phoneNumber: '0123456789',
    email: 'test@email.com',
    birthDay: this.bD.toLocaleDateString(),
    bloodType: 'B(III) Rh+',
    gender: 'Чоловік',
  }

  filter!:string;
  

  displayedColumns: string[] = ['date', 'doctor', 'diagnose', 'treatment'];
  dataSource: MatTableDataSource<MedicalRecord>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(medicalRecords);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: any, filter: string) => {

      const [filterValue, fDateStart, fDateEnd] = filter.split('|');

      const dateStart = fDateStart === 'undefined' ? null : new Date(fDateStart);
      const dateEnd = fDateEnd === 'undefined' ? null : new Date(fDateEnd);
      const fValue = filterValue === 'undefined' ? null : filterValue;

      const dataDate:Date = new Date(data.date);
      dataDate.setHours(0, 0, 0, 0);

      const isInDateRange = 
        (!dateStart || dataDate >= dateStart) && 
        (!dateEnd || dataDate <= dateEnd);

      if(dateStart && dateEnd && !fValue){
        return isInDateRange;
      }
    
      const doctor = data.doctor ? data.doctor.trim().toLowerCase() : '';
      const treatment = data.treatment ? data.treatment[0].treatment.trim().toLowerCase() : '';
      const diagnose = data.diagnose ? data.diagnose.trim().toLowerCase() : '';
      const normalizedFilter = fValue ? fValue.trim().toLowerCase() : '';

      if(!dateStart && !dateEnd && fValue){
        return (doctor.includes(normalizedFilter) || 
        treatment.includes(normalizedFilter) || 
        diagnose.includes(normalizedFilter));;
      }

      return isInDateRange && 
             (doctor.includes(normalizedFilter) || 
              treatment.includes(normalizedFilter) || 
              diagnose.includes(normalizedFilter));
    };
  }

  removeFilter(){
    this.filter =''
    this.dateStart = null;
    this.dateEnd = null;

    this.applyFilter();
  }

  qwe(id:string){
    const dialogRef = this.dialog.open(MedicalRecordDetailsDialogComponent, {
      data: medicalRecords.find((mR) => mR.id == id),
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed, input value: ', result);
    });
  }

  applyFilter() {
    const filterValue = `${this.filter}|${this.dateStart?.toUTCString()}|${this.dateEnd?.toUTCString()}`;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
