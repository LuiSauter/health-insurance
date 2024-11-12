import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Specialities } from '../interfaces/medic.interface';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {
  private baseUrl: string = environment.baseUrl + '/specialty';
  constructor(private http: HttpClient) { }

  getAllSpecialties(): Observable<ApiResponse<Specialities[]>> {
    return this.http.get<ApiResponse<Specialities[]>>(`${this.baseUrl}`);
  }
}
