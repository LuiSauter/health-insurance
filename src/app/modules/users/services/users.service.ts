import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBranch, IUser } from '../interfaces';
import { ApiService } from '../../../core/services/api.service';
import { IRole } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'users'),
  deps: [HttpClient],
})
export class UsersService extends ApiService<IUser> {}

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'roles'),
  deps: [HttpClient],
})
export class RolesService extends ApiService<IRole> {}

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new ApiService(http, 'branch'),
  deps: [HttpClient],
})
export class BranchService extends ApiService<IBranch> {}
