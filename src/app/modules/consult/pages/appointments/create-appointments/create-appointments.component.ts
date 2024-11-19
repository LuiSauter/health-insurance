import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Appointment } from '../../../interfaces/consult.interface';
import { Doctor, Patient } from '../../../../clinic/interfaces/medic.interface';
import { AppointmentsService } from '../../../consult.service';
import { MedicService } from '../../../../clinic/services/medics.service';
import { PatientService } from '../../../../clinic/services/patient.service';

import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { format } from 'date-fns';

@Component({
  selector: 'app-create-appointment-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, FormsModule, NgIf, NgFor,
    CalendarModule
  ],
  templateUrl: './create-appointments.component.html',
})
export class CreateAppointmenComponent implements OnInit {
  @Input() appointment?: Appointment = {} as Appointment;
  @Output() closeModal = new EventEmitter<void>();
  @Output() appointmentCreated = new EventEmitter<Appointment>();

  form!: FormGroup;
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  schedules: any[] = [];
  submitted = false;

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedEvent?: CalendarEvent; // Evento seleccionado
  view: CalendarView = CalendarView.Week;

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private doctorsService: MedicService,
    private patientsService: PatientService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      doctorId: [this.appointment?.doctor?.id ?? '', Validators.required],
      patientId: [this.appointment?.patient?.id ?? '', Validators.required],
      schedule: ['', Validators.required],
    });

    this.loadDoctors();
    this.loadPatients();
  }

  get f() {
    return this.form.controls;
  }

  loadDoctors() {
    this.doctorsService.getAll().subscribe((data) => {
      this.doctors = data.data || [];
    });
  }

  loadPatients() {
    this.patientsService.getAll().subscribe((data) => {
      this.patients = data.data || [];
    });
  }

  loadDoctorAvailability() {
    const doctorId = this.form.value.doctorId ?? '';
    if (doctorId) {
      this.doctorsService.get(doctorId, "/availability").subscribe((response) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          this.schedules = response.data;
          this.populateCalendarEvents(response.data);
        } else {
          this.schedules = [];
          this.events = [];
        }
      });
    }
  }

  populateCalendarEvents(schedules: any[]) {
    this.events = schedules.flatMap(schedule =>
      schedule.hours.filter((hour: any) => hour.isAvailable).map((hour: any) => ({
        start: new Date(`${schedule.date}T${hour.startTime}`),
        end: new Date(`${schedule.date}T${hour.endTime}`),
        title: `${hour.startTime.slice(0, 5)} - ${hour.endTime.slice(0, 5)}`,
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        meta: { formattedDate: schedule.date }
      }))
    );
  }

  onTimeSelected(event: CalendarEvent) {
    if (this.selectedEvent) {
      this.selectedEvent.color = { primary: '#1e90ff', secondary: '#D1E8FF' }; // Restaurar color
    }
    event.color = { primary: '#28a745', secondary: '#d4edda' }; // Color verde
    this.selectedEvent = event;

    const formattedDateTime = `${format(event.start, 'yyyy-MM-dd')}T${format(event.start, 'HH:mm:ss')}`;
    this.form.patchValue({
      schedule: formattedDateTime,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const appointmentData = {
      doctorId: this.form.value.doctorId,
      patientId: this.form.value.patientId,
      appointmentDate: this.form.value.schedule,
      googleCalendar: false
    };

    if (this.appointment?.id) {
      this.appointmentsService.update(this.appointment.id, appointmentData)
        .subscribe(updatedAppointment => {
          this.appointmentCreated.emit(updatedAppointment.data);
          this.closeModal.emit();
        });
    } else {
      this.appointmentsService.create(appointmentData)
        .subscribe(newAppointment => {
          this.appointmentCreated.emit(newAppointment.data);
          this.closeModal.emit();
        });
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
