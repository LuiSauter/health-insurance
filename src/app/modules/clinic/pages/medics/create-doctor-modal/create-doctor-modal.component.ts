import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../users/services/users.service';
import { SpecialitiesService } from '../../../services/specialities.service';
import { MedicService } from '../../../services/medics.service';
import { CreateDoctor } from '../../../interfaces/medic.interface';

@Component({
  selector: 'app-create-doctor-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-doctor-modal.component.html',
})
export class CreateDoctorModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() doctorCreated = new EventEmitter<any>();

  form!: FormGroup;
  submitted = false;

  users: any[] = [];
  specialties: any[] = [];
  daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private specialtyService: SpecialitiesService,
    private medicService: MedicService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      licenseNumber: ['', Validators.required],
      specialtyId: ['', Validators.required],
      userId: ['', Validators.required],
      scheduleIds: this.fb.array([this.createScheduleGroup()]),
    });

    this.loadUsers();
    this.loadSpecialties();
  }

  get f() {
    return this.form.controls;
  }

  get scheduleIds() {
    return this.form.get('scheduleIds') as FormArray;
  }

  createScheduleGroup() {
    return this.fb.group({
      dayOfWeek: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  addSchedule() {
    this.scheduleIds.push(this.createScheduleGroup());
  }

  removeSchedule(index: number) {
    this.scheduleIds.removeAt(index);
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.data || [];
    });
  }

  loadSpecialties() {
    this.specialtyService.getAllSpecialties().subscribe((data) => {
      this.specialties = data.data || [];
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.doctorCreated.emit(this.form.value);
    const medic: CreateDoctor = {
      licenseNumber: this.form.value.licenseNumber,
      specialtyId: this.form.value.specialtyId,
      scheduleIds: this.form.value.scheduleIds.map((schedule: any) => ({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime.padEnd(8, ":00"),
        endTime: schedule.endTime.padEnd(8, ":00")
      })),
      userId: this.form.value.userId
    }
    console.log(this.form.value);
    this.medicService.createDoctor(medic).subscribe(() => {
      this.closeModal.emit();
    });
    this.closeModal.emit();
  }

  onClose() {
    this.closeModal.emit();
  }
}
