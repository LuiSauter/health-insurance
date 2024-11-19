import { Component, Input } from '@angular/core';
import { IUser } from '../../../../../interfaces';
import { Router } from '@angular/router';
import { UsersService } from '../../../../../services/users.service';
import { CreateUserComponent } from '../../../create-user/create-user.component';
import { NgIf } from '@angular/common';

@Component({
  selector: '[users-table-item]',
  templateUrl: './users-table-item.component.html',
  imports: [CreateUserComponent, NgIf],
  standalone: true,
})
export class UsersTableItemComponent {
  @Input() auction = <IUser>{};
  public dropdownOpen = false;
  public showModal = false;
  public user: IUser = <IUser>{};

  constructor(
    private router: Router,
    private userService: UsersService
  ) { }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onEdit(user: IUser): void {
    this.showModal = true;
    this.user = user;
  }

  onDelete(userId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.delete(userId).subscribe(() => {
        alert('Usuario eliminado con éxito.');
      });
    }
  }

  onView(userId: string): void {
    this.router.navigate(['/users/view', userId]);
  }

  closeCreateModal() {
    this.showModal = false;
    this.user = {} as IUser;
  }
}
