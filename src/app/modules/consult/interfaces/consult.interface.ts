import { Doctor, Patient } from "../../clinic/interfaces/medic.interface";

export interface Appointment extends ApiBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  doctor: Doctor;
  patient: Patient;
  appointmentDate: string;
  status: string;
  googleCalendarEventId: string;
}
