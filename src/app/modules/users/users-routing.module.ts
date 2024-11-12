import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { ListRolesComponent } from './pages/roles/list-roles/list-roles.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      // { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: '', component: ListUsersComponent },
      { path: 'roles', component: ListRolesComponent },
      { path: '**', redirectTo: 'errors/404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
