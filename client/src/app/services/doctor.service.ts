import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DoctorResponse } from '../interfaces/doctor-response';
import { DoctorDetailsResponse } from '../interfaces/doctor-details-response';
import { FilterRequest } from '../interfaces/filter-request';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<DoctorResponse[]> {
    return this.http.get<DoctorResponse[]>(`${this.apiUrl}doctor`);
  }

  getDetails(id: string): Observable<DoctorDetailsResponse> {
    return this.http.get<DoctorDetailsResponse>(`${this.apiUrl}doctor/${id}`);
  }
  filter(data: FilterRequest): Observable<DoctorResponse[]> {
    return this.http.post<DoctorResponse[]>(
      `${this.apiUrl}doctor/filter`,
      data
    );
  }
}
