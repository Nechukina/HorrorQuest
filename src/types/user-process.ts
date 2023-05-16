import { AuthorizationStatus } from '../const';

export type UserData = {
  email: string;
  token: string;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

export type AuthData = {
  email: string;
  password: string;
  }
