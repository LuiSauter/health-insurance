import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users-header.component.html',
})
export class UsersHeaderComponent {
  @Input()
  public count: number = 0;
  constructor() { }

  ngOnInit(): void { }
}
