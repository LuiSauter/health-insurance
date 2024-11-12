import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUser } from '../../../../../interfaces';
import { Router } from '@angular/router';
import { UsersService } from '../../../../../services/users.service';

@Component({
  selector: '[users-table-item]',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './users-table-item.component.html',
})
export class UsersTableItemComponent {
  @Input() auction = <IUser>{};

  constructor(
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    console.log(this.auction);
  }
}
