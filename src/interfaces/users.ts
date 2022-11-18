import { ISingUpData } from './auth';

export interface IUsersState {
  name: string | null;
  login: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface IupdateUserData extends ISingUpData {
  userId: string;
}
