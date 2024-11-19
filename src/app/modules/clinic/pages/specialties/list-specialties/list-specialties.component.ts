import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { Specialities } from '../../../interfaces/medic.interface';
import { SpecialityService } from '../../../services/specialities.service';
import { CreateSpecialtyModalComponent } from '../create-speciality/create-specialty-modal.component';

@Component({
  selector: 'app-list-specialties',
  standalone: true,
  imports: [SvgIconComponent, CurrencyPipe, NgFor, RouterLink, CreateSpecialtyModalComponent, NgIf],
  templateUrl: './list-specialties.component.html'
})
export class ListSpecialtiesComponent {
  public specialities?: Array<Specialities> | null = null;
  public showModal = false;
  public specialty: Specialities = {} as Specialities;

  constructor(private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.specialityService.getAll().subscribe((specialities) => {
      this.specialities = specialities.data;
    });
  }

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
  }


  onEdit(item: Specialities) {
    this.specialty = item;
    this.showModal = true;
  }

  openCreateSpecialtyModal() {
    this.showModal = true;
    // this.specialty = {} as Specialities;
  }

  closeCreateSpecialtyModal() {
    this.showModal = false;
    this.specialty = {} as Specialities;
  }

  addSpecialty(item: Specialities) {
    if (this.specialities) {
      const index = this.specialities.findIndex((r) => r.id === item.id);
      if (index >= 0) {
        this.specialities[index] = item;
      } else {
        this.specialities.push(item);
      }
    }
  }
}
