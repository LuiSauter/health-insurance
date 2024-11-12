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

export interface Schedule extends ApiBase {
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
