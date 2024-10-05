import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientComponent } from './pages/patient/patient.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'doctor/:id',
        component: DoctorComponent,
    },
    {
        path: 'doctor/:id/appointments',
        component: AppointmentsComponent,
    },
    {
        path: 'patients',
        component: PatientsComponent,
    }
];
