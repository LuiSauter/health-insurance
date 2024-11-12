import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-create-patient-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-patient-modal.component.html',
})
export class CreatePatientModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() patientCreated = new EventEmitter<any>();

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

    this.patientCreated.emit(this.form.value);
    this.patientService.createPatient(this.form.value).subscribe(() => {
      this.closeModal.emit();
    });
    this.closeModal.emit();
  }

  onClose() {
    this.closeModal.emit();
  }
}
