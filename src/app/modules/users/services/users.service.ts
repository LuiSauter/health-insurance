import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICreateUser, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = environment.baseUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<ApiResponse<IUser[]>> {
    return this.http.get<ApiResponse<IUser[]>>(`${this.baseUrl}`);
  }

  getUser(id: string): Observable<ApiResponse<IUser> | null> {
    return this.http.get<ApiResponse<IUser>>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  createUser(user: ICreateUser): Observable<ApiResponse<IUser>> {
    return this.http.post<ApiResponse<IUser>>(`${this.baseUrl}`, user);
  }

  updateUser(userId: string, data: any): Observable<ApiResponse<IUser>> {
    return this.http.patch<ApiResponse<IUser>>(`${this.baseUrl}/${userId}`, data);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}
