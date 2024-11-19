import { Appointment } from "../../consult/interfaces/consult.interface";
import { IUser } from "../../users/interfaces";

export interface Doctor extends ApiBase {
  licenseNumber: string;
  specialties: Specialities;
  schedules: Schedule[];
  user: IUser;
}

export interface CreateDoctor {
  licenseNumber: string;
  specialtyId: string;
  scheduleIds: Schedule[];
  userId: string;
}

export interface Schedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface Specialities extends ApiBase {
  name: string;
  description: string;
  branch: Branch;
}

export interface Branch extends ApiBase {
  name: string;
  address: string;
  phone: string;
  email: string;
  active: boolean;
}

export interface Patient extends ApiBase {
  name: string,
  phone: string,
  email: string
}

export interface CreatePatient {
  name: string,
  phone: string,
  email: string,
  password: string
}

export interface FormTemplate {
  formName: string;
  formStructure: FormStructure;
}

export interface FormTemplateApi extends ApiBase {
  formName: string;
  formStructure: string ;
}

export interface FormStructure {
  fields: FormField[];
}

export enum FormFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
}

export interface FormField {
  name: string;       // Nombre del campo, usado como key
  type: FormFieldType; // Tipos de entrada admitidos
  label: string;      // Etiqueta visible para el usuario
  required: boolean;  // Indicador si el campo es obligatorio
  options?: string[]; // Opcional, usado solo si el campo tiene opciones (select, radio, checkbox)
}

export interface FilledForms extends ApiBase {
  formTemplate: FormTemplate;
  client: Patient;
  appointment: Appointment;
  appointmentDate: string;
  filledData: string;
  dateFilled: string
}
