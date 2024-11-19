import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultComponent } from './consult.component';
import { ListAppointmentsComponent } from './pages/appointments/list-appointments/list-appointments.component';
import { ShowAppointmentsComponent } from './pages/appointments/show-appointments/show-appointments.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultComponent,
    children: [
      { path: '', redirectTo: 'citas', pathMatch: 'full' },
      { path: 'citas', component: ListAppointmentsComponent },
      { path: 'citas/:id', component: ShowAppointmentsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultRoutingModule { }
