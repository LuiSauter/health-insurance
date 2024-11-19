import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { UsersHeaderComponent } from './table/users-header/users-header.component';
import { UsersTableComponent } from './table/users-table.component';
import { IUser } from '../../../interfaces';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [UsersHeaderComponent, UsersTableComponent],
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent {
  public users?: Array<IUser> | null = null;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
    });
  }
}
