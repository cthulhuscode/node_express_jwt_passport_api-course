export interface IUser {
  id: number;
  email: string;
  password: string;
  recoveryToken: string;
  createdAt: Date;
}
