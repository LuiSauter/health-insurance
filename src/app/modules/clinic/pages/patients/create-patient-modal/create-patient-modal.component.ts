import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Patient } from '../../../interfaces/medic.interface';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-create-patient-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-patient-modal.component.html',
})
export class CreatePatientModalComponent implements OnInit {
  @Input() patient: Patient = {} as Patient;
  @Output() closeModal = new EventEmitter<void>();
  @Output() patientCreated = new EventEmitter<any>();

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.patient.name ?? '', Validators.required],
      phone: [this.patient.phone ?? '', Validators.required],
      email: [this.patient.email ?? '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.patient.id) {
      this.patientService.update(this.patient.id, this.form.value).subscribe((patient) => {
        this.patientCreated.emit(patient);
      });
    } else {
      this.patientCreated.emit(this.form.value);
      this.patientService.create(this.form.value).subscribe(() => {
        this.closeModal.emit();
      });
    }
    this.closeModal.emit();
  }

  onClose() {
    this.closeModal.emit();
  }
}
