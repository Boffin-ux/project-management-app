export interface IAuthState {
  token: string | null;
  status: string | null;
  error: string | null;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface ISingUpData extends ISignInData {
  name: string;
}
