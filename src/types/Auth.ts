import { User } from "./User";

export interface LoginResponse {
  access_token: string;
  user: User;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
