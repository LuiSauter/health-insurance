import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('../users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'clinica',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('../clinic/clinic.module').then((m) => m.ClinicModule)
  },
  {
    path: 'consultas',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('../consult/consult.module').then((m) => m.ConsultModule)
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
