import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../users/services/users.service';
import { MedicService } from '../../../services/medics.service';
import { CreateDoctor, Doctor } from '../../../interfaces/medic.interface';
import { SpecialityService } from '../../../services/specialities.service';

@Component({
  selector: 'app-create-doctor-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-doctor-modal.component.html',
})
export class CreateDoctorModalComponent implements OnInit {
  @Input() doctor?: Doctor = {} as Doctor;
  @Output() closeModal = new EventEmitter<void>();
  @Output() doctorCreated = new EventEmitter<any>();

  form!: FormGroup;
  submitted = false;

  users: any[] = [];
  specialties: any[] = [];
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  scheduleForm: { [key: string]: { startTime: string; endTime: string } } = {};

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private specialtyService: SpecialityService,
    private medicService: MedicService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      licenseNumber: [this.doctor?.licenseNumber ?? '', Validators.required],
      specialtyId: [this.doctor?.specialties?.id ?? '', Validators.required],
      userId: [this.doctor?.user?.id ?? '', Validators.required],
    });

    this.initializeScheduleForm();
    this.loadUsers();
    this.loadSpecialties();

    if (this.doctor) {
      this.preloadSchedules(this.doctor.schedules);
    }
  }

  get f() {
    return this.form.controls;
  }

  initializeScheduleForm() {
    this.daysOfWeek.forEach(day => {
      this.scheduleForm[day] = { startTime: '', endTime: '' };
    });
  }

  preloadSchedules(schedules: any[]) {
    schedules.forEach(schedule => {
      const day = this.getDayOfWeekSpanish(schedule.dayOfWeek);
      if (this.scheduleForm[day]) {
        this.scheduleForm[day].startTime = schedule.startTime.slice(0, 5);
        this.scheduleForm[day].endTime = schedule.endTime.slice(0, 5);
      }
    });
  }

  loadUsers() {
    this.userService.getAll().subscribe((data) => {
      this.users = data.data || [];
    });
  }

  loadSpecialties() {
    this.specialtyService.getAll().subscribe((data) => {
      this.specialties = data.data || [];
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const scheduleIds = Object.entries(this.scheduleForm)
      .filter(([_, times]) => times.startTime && times.endTime)
      .map(([day, times]) => ({
        dayOfWeek: this.getDayOfWeekEnglish(day),
        startTime: `${times.startTime}:00`,
        endTime: `${times.endTime}:00`,
      }));

    const doctorData: CreateDoctor = {
      licenseNumber: this.form.value.licenseNumber,
      specialtyId: this.form.value.specialtyId,
      userId: this.form.value.userId,
      scheduleIds,
    };

    console.log('Doctor data:', doctorData);

    if (this.doctor?.createdAt) {
      this.medicService.update(this.doctor.id, doctorData).subscribe(() => {
        this.closeModal.emit();
      });
    } else {
      this.medicService.create(doctorData).subscribe(() => {
        this.closeModal.emit();
      });
    }
  }

  getDayOfWeekSpanish(day: string): string {
    const dayMap: { [key: string]: string } = {
      MONDAY: 'Lunes',
      TUESDAY: 'Martes',
      WEDNESDAY: 'Miércoles',
      THURSDAY: 'Jueves',
      FRIDAY: 'Viernes',
      SATURDAY: 'Sábado',
      SUNDAY: 'Domingo',
    };
    return dayMap[day];
  }

  getDayOfWeekEnglish(day: string): string {
    const dayMap: { [key: string]: string } = {
      'Lunes': 'MONDAY',
      'Martes': 'TUESDAY',
      'Miércoles': 'WEDNESDAY',
      'Jueves': 'THURSDAY',
      'Viernes': 'FRIDAY',
      'Sábado': 'SATURDAY',
      'Domingo': 'SUNDAY',
    };
    return dayMap[day];
  }

  onClose() {
    this.closeModal.emit();
  }
}
