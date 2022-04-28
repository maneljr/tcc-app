import { Dispatch, SetStateAction } from 'react';

import { User } from 'firebase/auth';
import { ISolicitation } from 'pages/Home/components/Calendar/types';
import { IDoctor } from 'pages/RegisterDoctor/types';
import { IPlace } from 'pages/RegisterPlace/components/ModalUpdatePlace/types';
import { IDataUsers } from 'util/types';

export enum UserPermission {
  Admin = 'ADMIN',
}

export interface ISessionContext {
  user: User | null;
  dataCurrentUser: IDataUsers | null;
  solicitations: ISolicitation[];
  doctors: IDoctor[];
  places: IPlace[];
  badge: number;
  local: string;
  filterDoctor: string;
  setLocal: Dispatch<SetStateAction<string>>;
  setFilterDoctor: Dispatch<SetStateAction<string>>;
}
