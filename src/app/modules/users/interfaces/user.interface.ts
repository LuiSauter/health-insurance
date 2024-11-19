import { Branch, Doctor, Schedule } from "../../clinic/interfaces/medic.interface";
import { IRole } from "./role.interface";

export interface IUser extends ApiBase {
  ci: string,
  name: string,
  phone: string,
  email: string,
  gender: string,
  active: true,
  role: IRole,
  branch: Branch,
  doctor?: Doctor,
  schedules: Array<Schedule>,
}

export interface ICreateUser {
  ci: string,
  name: string,
  email: string,
  password: string,
  phone: string,
  roleId: string,
  branchId: string
}

export interface IBranch extends ApiBase {
  name: string,
  address: string,
  phone: string,
  email: string,
  active: true
}