import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor, FilledForms, FormTemplate, FormTemplateApi } from '../interfaces/medic.interface';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'doctor'),
  deps: [HttpClient],
})
export class MedicService extends ApiService<Doctor> { }

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'form-templates'),
  deps: [HttpClient],
})
export class FormTemplatesService extends ApiService<FormTemplateApi> { }

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'filled-forms'),
  deps: [HttpClient],
})
export class FilledFormsService extends ApiService<FilledForms> { }
