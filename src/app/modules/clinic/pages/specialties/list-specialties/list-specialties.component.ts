import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { Specialities } from '../../../interfaces/medic.interface';
import { SpecialitiesService } from '../../../services/specialities.service';

@Component({
  selector: 'app-list-specialties',
  standalone: true,
  imports: [SvgIconComponent, CurrencyPipe, NgFor, RouterLink],
  templateUrl: './list-specialties.component.html'
})
export class ListSpecialtiesComponent {
  public specialities?: Array<Specialities> | null = null;

  constructor(private specialitiesService: SpecialitiesService) { }

  ngOnInit(): void {
    this.specialitiesService.getAllSpecialties().subscribe((specialities) => {
      this.specialities = specialities.data;
    });
  }

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
  }
}
