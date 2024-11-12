import { Component } from '@angular/core';
import { IRole } from '../../../interfaces/role.interface';
import { RolesService } from '../../../services/roles.service';
import { RolesHeaderComponent } from './table/roles-header/roles-header.component';
import { RolesTableComponent } from './table/roles-table.component';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [RolesHeaderComponent, RolesTableComponent],
  templateUrl: './list-roles.component.html',
})
export class ListRolesComponent {
  public roles?: Array<IRole> | null = null;

  constructor(private roleService: RolesService) { }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe((roles) => {
      this.roles = roles.data;
    });
  }
}
