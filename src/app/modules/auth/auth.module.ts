import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
