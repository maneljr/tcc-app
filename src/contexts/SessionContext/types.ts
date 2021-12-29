import { User } from 'firebase/auth';
import { ISolicitation } from 'pages/Home/components/Calendar/types';
import { IDataUsers } from 'util/types';

export enum UserPermission {
  Admin = 'ADMIN',
}

export interface ISessionContext {
  user: User | null;
  dataCurrentUser: IDataUsers | null;
  solicitations: ISolicitation[];
  badge: number;
}
