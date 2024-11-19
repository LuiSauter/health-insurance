import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import { Patient } from '../interfaces/medic.interface';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'client'),
  deps: [HttpClient],
})
export class PatientService extends ApiService<Patient> { }
