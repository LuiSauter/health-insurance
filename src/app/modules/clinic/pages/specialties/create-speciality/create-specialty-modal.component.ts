import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpecialityService } from '../../../services/specialities.service';
import { Branch, Specialities } from '../../../interfaces/medic.interface';
import { BranchService } from '../../../../users/services/users.service';

@Component({
  selector: 'app-create-specialty-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-specialty-modal.component.html',
})
export class CreateSpecialtyModalComponent implements OnInit {
  @Input() specialty?: Specialities = {} as Specialities;
  @Output() closeModal = new EventEmitter<void>();
  @Output() specialtyCreated = new EventEmitter<Specialities>();


  form!: FormGroup;
  submitted = false;

  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private specialityService: SpecialityService,
    private branchService: BranchService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.specialty?.name || '', Validators.required],
      description: [this.specialty?.description || '', Validators.required],
      branchId: [this.specialty?.branch?.id || '', Validators.required],
    });

    console.log('Specialty:', this.specialty);

    this.loadBranches();
  }

  get f() {
    return this.form.controls;
  }

  loadBranches() {
    this.branchService.getAll().subscribe((data) => {
      this.branches = data.data || [];
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.specialty?.name) {
      // Editar especialidad
      this.specialityService.update(this.specialty.id, this.form.value).subscribe(updatedSpecialty => {
        this.specialtyCreated.emit(updatedSpecialty.data!);
        this.closeModal.emit();
      });
    } else {
      // Crear nueva especialidad
      this.specialityService.create(this.form.value).subscribe(newSpecialty => {
        this.specialtyCreated.emit(newSpecialty.data!);
        this.closeModal.emit();
      });
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
