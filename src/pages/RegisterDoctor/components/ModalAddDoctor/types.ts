export interface ImodalAddDoctor {
  open: boolean;
  onClose: () => void;
}

export interface IAddDoctor {
  local: string;
  nome: string;
  especialidade: string;
  crm: string;
  celular: string;
  atendimento: IAtendimento[];
  cpf: string;
}

export interface IAtendimento {
  dia: string;
  horario: string;
  max: number;
}
