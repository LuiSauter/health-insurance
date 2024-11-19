import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { LayoutRoutingModule } from './layout-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularSvgIconModule.forRoot(),
    // NgxsModule.forRoot([GlobalState])
  ],
})
export class LayoutModule { }
