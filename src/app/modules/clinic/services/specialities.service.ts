import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Specialities } from '../interfaces/medic.interface';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'specialty'),
  deps: [HttpClient],
})
export class SpecialityService extends ApiService<Specialities> { }

