import { IAtendimento } from './components/ModalAddDoctor/types';

export interface IDoctor {
  id: string;
  atendimento: IAtendimento[];
  cpf: string;
  celular: string;
  nome: string;
  crm: string;
  especialidade: string;
  local: string;
}

export interface IDoctorUpdate {
  local: string;
  atendimento: IAtendimento[];
  cpf: string;
  celular: string;
  nome: string;
  crm: string;
  especialidade: string;
}

export interface IModalUpdateDoctor {
  doctor?: IDoctor;
  open: boolean;
  onClose: () => void;
}
