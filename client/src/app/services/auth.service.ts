import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable } from 'rxjs/internal/Observable';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterRequest } from '../interfaces/register-request';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
          }
          return response;
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, data);
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return true;
  }

  getToken(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  }

  refreshToken(data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}account/refresh-token`,
      data
    );
  }

  getUserDetail() {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);

    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role ? [decodedToken.role] : [],
    };

    return userDetail;
  }

  getRefreshToken(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  }
}
