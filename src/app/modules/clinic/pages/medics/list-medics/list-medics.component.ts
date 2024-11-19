import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Doctor } from '../../../interfaces/medic.interface';
import { MedicService } from '../../../services/medics.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CreateDoctorModalComponent } from "../create-doctor-modal/create-doctor-modal.component";

@Component({
  selector: 'app-list-medics',
  standalone: true,
  imports: [SvgIconComponent, CurrencyPipe, NgFor, NgIf, RouterLink, CreateDoctorModalComponent],
  templateUrl: './list-medics.component.html',
})
export class ListMedicsComponent {
  public medics?: Array<Doctor> | null = null;
  public showModal = false;
  public medic: Doctor = <Doctor>{};

  constructor(private medicService: MedicService) { }

  ngOnInit(): void {
    this.medicService.getAll().subscribe((medics) => {
      this.medics = medics.data;
    });
  }

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
  }

  onEdit(item: Doctor) {
    this.medic = item;
    this.showModal = true;
  }

  openCreateDoctortModal() {
    this.showModal = true;
  }

  closeCreateDoctortModal() {
    this.showModal = false;
    this.medic = {} as Doctor;
  }

  addDoctor(item: Doctor) {
    if (this.medics) {
      if (item.createdAt) {
        const index = this.medics.findIndex((r) => r.id === item.id);
        this.medics[index] = item;
      } else {
        this.medics.push(item);
      }
    }
  }
}
