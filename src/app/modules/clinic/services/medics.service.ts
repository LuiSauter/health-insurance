import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDoctor, Doctor } from '../interfaces/medic.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private baseUrl: string = environment.baseUrl + '/doctor';
  constructor(private http: HttpClient) { }

  getAllDoctor(): Observable<ApiResponse<Doctor[]>> {
    return this.http.get<ApiResponse<Doctor[]>>(`${this.baseUrl}`);
  }

  createDoctor(doctor: CreateDoctor): Observable<ApiResponse<Doctor>> {
    return this.http.post<ApiResponse<Doctor>>(`${this.baseUrl}`, doctor);
  }
}
