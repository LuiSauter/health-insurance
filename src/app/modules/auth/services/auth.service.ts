import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {LoginResponse } from '../interfaces';
import { ICreateUser, IUser } from '../../users/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/auth/login`, { email, password });
  }

  register(user: ICreateUser): Observable<ApiResponse<IUser>> {
    return this.http.post<ApiResponse<IUser>>(`${this.baseUrl}/users`, user);
  }

  checkToken(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.http.get<ApiResponse<IUser>>(`${this.baseUrl}/auth?token=${token}`).
      pipe(
        map(user => {
          return user.data;
        }),
        map(isAuth => {
          if (!isAuth) this.logout();
          return true;
        }),
        catchError(err => of(false))
      );
  }

  checkPermission(): boolean {
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
