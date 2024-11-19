import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from '../../../consult.service';
import { Appointment } from '../../../interfaces/consult.interface';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FilledFormsService } from '../../../../clinic/services/medics.service';
import { FilledForms } from '../../../../clinic/interfaces/medic.interface';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFilledFormComponent } from '../create-filled-form/create-filled-form.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-show-appointments',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, CommonModule, SvgIconComponent, CreateFilledFormComponent],
  templateUrl: './show-appointments.component.html',
})
export class ShowAppointmentsComponent {
  // @Input() appointment: any;
  // @Output() statusChange = new EventEmitter<string>();
  // @Output() actionPerformed = new EventEmitter<string>();
  appointment: Appointment = {} as Appointment;
  filledForms: FilledForms[] = [] as FilledForms[];
  public showModal = false;

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private filledFormService: FilledFormsService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') ?? ''
    this.appointmentsService.get(id, '').subscribe((appointment) => {
      this.appointment = appointment?.data ?? {} as Appointment;
    });
    this.filledFormService.get(`appointment/${id}`, '').subscribe((filledForms) => {
      this.filledForms = Array.isArray(filledForms?.data) ? filledForms.data : [] as FilledForms[];
    });
  }
  updateStatus(newStatus: string) {
    // this.statusChange.emit(newStatus);
  }

  performAction(action: string) {
    // this.actionPerformed.emit(action);
  }

  openCreateModal(): void {
    this.showModal = true;
  }

  closeCreateModal(): void {
    this.showModal = false;
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
