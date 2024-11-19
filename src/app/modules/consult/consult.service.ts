import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/services/api.service';
import { Appointment } from './interfaces/consult.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'appointment/'),
  deps: [HttpClient],
})
export class AppointmentsService extends ApiService<Appointment> {
  // agregar mas endpoints
  // appointment/login/google
  // appointment/login/google/callback
  // appointment/notifications
  constructor(http: HttpClient) {
    super(http, 'appointment');
  }

  // Método para login con Google
  loginWithGoogle(): Observable<any> {
    return this.http.get(`${this.getBaseUrl()}/login/google`);
  }

  // Método para manejar el callback de Google
  handleGoogleCallback(queryParams: any): Observable<any> {
    return this.http.get(`${this.getBaseUrl()}/login/google/callback`, { params: queryParams });
  }

  // Método para obtener notificaciones de citas
  getNotifications(): Observable<any> {
    return this.http.get(`${this.getBaseUrl()}/notifications`);
  }
}

