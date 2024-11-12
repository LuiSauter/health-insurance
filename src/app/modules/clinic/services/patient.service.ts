import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePatient, Patient } from '../interfaces/medic.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl: string = environment.baseUrl + '/client/';
  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<ApiResponse<Patient[]>> {
    return this.http.get<ApiResponse<Patient[]>>(`${this.baseUrl}`);
  }

  createPatient(patient: CreatePatient): Observable<ApiResponse<Patient>> {
    return this.http.post<ApiResponse<Patient>>(`${this.baseUrl}`, patient);
  }
}
