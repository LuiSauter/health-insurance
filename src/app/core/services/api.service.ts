import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  private baseUrl: string;
  // Cambiar de private a protected
  protected http: HttpClient;
  protected entity: string;

  constructor(private httpClient: HttpClient, @Inject(String) entity: string) {
    this.http = httpClient;
    this.entity = entity;
    this.baseUrl = `${environment.baseUrl}/${entity}`;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getAll(): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(`${this.baseUrl}`);
  }

  get(id: string, endpoint: string): Observable<ApiResponse<T> | null> {
    if (this.entity.indexOf('/') === this.entity.length - 1) {
      return this.http.get<ApiResponse<T>>(`${this.baseUrl.substring(0, this.baseUrl.length - 1)}/${id}${endpoint ? `${endpoint}` : ''}`)
        .pipe(
          catchError(err => of(null))
        );
    } else {

      return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${id}${endpoint ? `${endpoint}` : ''}`)
        .pipe(
          catchError(err => of(null))
        );
    }
  }

  create<S>(data: S): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}`, data);
  }

  update<U>(id: string, data: Partial<U>): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        map(() => true),
        catchError(err => of(false))
      );
  }
}

// Interfaces
export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  error?: string;
  data?: T;
  countData?: number;
}
