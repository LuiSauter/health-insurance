import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RolesTableItemComponent } from './roles-table-item/roles-table-item.component';
import { IUser } from '../../../../interfaces';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IRole } from '../../../../interfaces/role.interface';

@Component({
  selector: '[roles-table]',
  standalone: true,
  imports: [NgFor, RolesTableItemComponent, AngularSvgIconModule],
  templateUrl: './roles-table.component.html',
})
export class RolesTableComponent {

  @Input()
  public roles: IRole[] | any = [];

  constructor() { }

  ngOnInit(): void {}

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
    // this.filterService.searchField.set(input.value);
  }
}
