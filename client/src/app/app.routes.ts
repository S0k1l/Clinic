import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientComponent } from './pages/patient/patient.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
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
    },
    {
        path: 'patient/:id',
        component: PatientComponent,
    }
];
