import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { CreateUserComponent } from '../../../create-user/create-user.component';

@Component({
  selector: 'app-users-header',
  standalone: true,
  imports: [RouterLink, CreateUserComponent, NgIf],
  templateUrl: './users-header.component.html',
})
export class UsersHeaderComponent {
  @Input()
  public count: number = 0;

  public showModal = false;

  constructor() { }

  ngOnInit(): void { }

  openCreateModal() {
    this.showModal = true;
  }

  closeCreateModal() {
    this.showModal = false;
  }
}
