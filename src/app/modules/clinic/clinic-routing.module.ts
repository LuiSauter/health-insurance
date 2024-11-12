import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic.component';
import { ListMedicsComponent } from './pages/medics/list-medics/list-medics.component';
import { ListSpecialtiesComponent } from './pages/specialties/list-specialties/list-specialties.component';
import { ListSchedulesComponent } from './pages/schedules/list-schedules/list-schedules.component';
import { ListPatientsComponent } from './pages/patients/list-patients/list-patients.component';
import { ListBranchComponent } from './pages/branch/list-branch/list-branch.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicComponent,
    children: [
      { path: '', component: ListBranchComponent },
      // { path: '', redirectTo: 'clinica', pathMatch: 'full' },
      { path: 'medicos', component: ListMedicsComponent },
      { path: 'especialidades', component: ListSpecialtiesComponent },
      { path: 'horarios', component: ListSchedulesComponent },
      { path: 'pacientes', component: ListPatientsComponent },
      { path: '**', redirectTo: 'errors/404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
