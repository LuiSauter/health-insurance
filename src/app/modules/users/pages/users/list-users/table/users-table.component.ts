import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UsersTableItemComponent } from './users-table-item/users-table-item.component';
import { IUser } from '../../../../interfaces';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[users-table]',
  standalone: true,
  imports: [NgFor, UsersTableItemComponent, AngularSvgIconModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {

  @Input()
  public users: IUser[] | any = [];

  constructor() { }

  ngOnInit(): void {}

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
    // this.filterService.searchField.set(input.value);
  }
}
