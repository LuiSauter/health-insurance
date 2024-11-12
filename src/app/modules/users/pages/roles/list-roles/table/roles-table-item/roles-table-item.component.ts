import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IRole } from '../../../../../interfaces/role.interface';

@Component({
  selector: '[roles-table-item]',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './roles-table-item.component.html',
})
export class RolesTableItemComponent {
  @Input() auction = <IRole>{};

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.auction);
  }
}
