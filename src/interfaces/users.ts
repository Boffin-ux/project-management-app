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

export interface IUser {
  id: string;
  name: string | null;
  login: string | null;
}

export interface IUsersState extends IUser {
  token: string;
  isLoading: boolean;
  error: string | null;
}

export interface IUsers {
  _id: string;
  name: string;
  login: string;
}
