import { User } from 'firebase/auth';

export enum UserPermission {
  Admin = 'ADMIN',
}

export interface ISessionContext {
  user: User | null;
}
