import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../interfaces/consult.interface';
import { NgFor, NgIf } from '@angular/common';
import { AppointmentsService } from '../../../consult.service';
import { CreateAppointmenComponent } from '../create-appointments/create-appointments.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [NgFor, NgIf, CreateAppointmenComponent, SvgIconComponent, RouterLink],
  templateUrl: './list-appointments.component.html',
})
export class ListAppointmentsComponent implements OnInit {
  public appointments?: Array<Appointment> | null = null;
  public showModal = false;
  public appointment: Appointment = {} as Appointment;

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentsService.getAll().subscribe((response) => {
      this.appointments = response.data;
    });
  }

  onEdit(appointment: Appointment) {
    this.appointment = appointment;
    this.showModal = true;
  }

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
  }

  openCreateAppointmentModal() {
    this.showModal = true;
  }

  closeCreateAppointmentModal() {
    this.showModal = false;
    this.appointment = {} as Appointment;
  }

  addAppointment(appointment: Appointment) {
    if (this.appointments) {
      const index = this.appointments.findIndex((a) => a.id === appointment.id);
      if (index !== -1) {
        this.appointments[index] = appointment;
      } else {
        this.appointments.push(appointment);
      }
    }
  }

  formatAppointmentDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = format(date, 'dd/MM/yy', { locale: es });
    const dayOfWeek = format(date, 'EEEE', { locale: es }); // Obtiene el día de la semana en español
    const formattedTime = format(date, 'hh:mm a', { locale: es });

    return `${formattedDate}, ${this.capitalize(dayOfWeek)} ${formattedTime}`;
  }

  capitalize(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1);
  }
}
