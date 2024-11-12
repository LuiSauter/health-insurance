import { IUser } from "../../users/interfaces/user.interface";

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: IUser;
}
