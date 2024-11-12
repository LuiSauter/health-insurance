import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl: string = environment.baseUrl + '/roles';
  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<ApiResponse<IRole[]>> {
    return this.http.get<ApiResponse<IRole[]>>(`${this.baseUrl}`);
  }
}
