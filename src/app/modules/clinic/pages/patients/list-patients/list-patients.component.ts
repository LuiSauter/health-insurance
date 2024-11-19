import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { Patient } from '../../../interfaces/medic.interface';
import { PatientService } from '../../../services/patient.service';
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { CreatePatientModalComponent } from '../create-patient-modal/create-patient-modal.component';

@Component({
  selector: 'app-list-patients',
  standalone: true,
  imports: [SvgIconComponent, CurrencyPipe, NgFor, NgIf, RouterLink, ButtonComponent, CreatePatientModalComponent],
  templateUrl: './list-patients.component.html'
})
export class ListPatientsComponent {
  public patiens?: Array<Patient> | null = null;
  public showModal = false;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getAll().subscribe((patients) => {
      this.patiens = patients.data;
    });
  }

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
  }


  openCreatePatientModal() {
    console.log('openCreatePatientModal');
    this.showModal = true;
  }

  closeCreatePatientModal() {
    this.showModal = false;
  }

  addPatient(patient: any) {
    if (this.patiens) {
      this.patiens.push(patient);
    }
  }
}
