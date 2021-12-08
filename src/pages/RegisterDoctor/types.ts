export interface IDoctor {
  id: string;
  atendimento: string;
  cpf: string;
  celular: string;
  nome: string;
  crm: string;
  especialidade: string;
}

export type IDoctorUpdate = Omit<IDoctor, 'id'>;

export interface IModalUpdateDoctor {
  doctor?: IDoctor;
  open: boolean;
  onClose: () => void;
}
