import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic.component';
import { ListMedicsComponent } from './pages/medics/list-medics/list-medics.component';
import { ListSpecialtiesComponent } from './pages/specialties/list-specialties/list-specialties.component';
import { ListPatientsComponent } from './pages/patients/list-patients/list-patients.component';
import { ListFormComponent } from './pages/forms/list-form/list-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicComponent,
    children: [
      { path: '', redirectTo: 'medicos', pathMatch: 'full' },
      { path: 'medicos', component: ListMedicsComponent },
      { path: 'especialidades', component: ListSpecialtiesComponent },
      { path: 'pacientes', component: ListPatientsComponent },
      { path: 'formularios', component: ListFormComponent },
      { path: '**', redirectTo: 'errors/404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
