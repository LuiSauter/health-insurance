import { Component } from '@angular/core';
import { IRole } from '../../../interfaces/role.interface';
import { RolesService } from '../../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { CreateRoleModalComponent } from '../create-role/create-role-modal.component';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [CreateRoleModalComponent, NgIf, NgFor, SvgIconComponent, RouterLink],
  templateUrl: './list-roles.component.html',
})
export class ListRolesComponent {
  public roles?: Array<IRole> | null = null;
  public showModal = false;
  public role: IRole = <IRole>{};

  constructor(private roleService: RolesService) {}

  ngOnInit(): void {
    this.roleService.getAll().subscribe((roles) => {
      this.roles = roles.data;
    });
  }

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
  }

  onEditRole(role: IRole) {
    this.role = role;
    this.showModal = true;
  }

  openCreateRoleModal() {
    this.showModal = true;
  }

  closeCreateRoleModal() {
    this.showModal = false;
    this.role = {} as IRole;
  }

  addRole(role: IRole) {
    if (this.roles) {
      if (role.createdAt) {
        const index = this.roles.findIndex((r) => r.id === role.id);
        this.roles[index] = role;
      } else {
        this.roles.push(role);
      }
    }
  }
}
