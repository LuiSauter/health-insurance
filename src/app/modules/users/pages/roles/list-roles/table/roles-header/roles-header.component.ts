import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roles-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './roles-header.component.html',
})
export class RolesHeaderComponent {
  @Input()
  public count: number = 0;
  constructor() { }

  ngOnInit(): void { }
}
