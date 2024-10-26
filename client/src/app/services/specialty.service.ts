import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SpecialtyResponse } from '../interfaces/specialty-response';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<SpecialtyResponse[]> {
    return this.http.get<SpecialtyResponse[]>(`${this.apiUrl}specialty`);
  }
}
