export interface ISignInData {
  login: string;
  password: string;
}
export interface ISingUpData extends ISignInData {
  name: string;
}

export interface IupdateUserData extends ISingUpData {
  userId: string;
}
export interface IUsersState {
  token: string;
  id: string;
  name: string | null;
  login: string | null;
  isLoading: boolean;
  error: string | null;
}
