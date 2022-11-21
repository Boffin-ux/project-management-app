export interface IAuthState {
  token: string;
  id: string;
  isLoading: boolean;
  error: string | null;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface ISingUpData extends ISignInData {
  name: string;
}
