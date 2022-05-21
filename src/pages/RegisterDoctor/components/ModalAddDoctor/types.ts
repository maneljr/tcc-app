export interface ImodalAddDoctor {
  open: boolean;
  onClose: () => void;
}

export interface IAddDoctor {
  nome: string;
  especialidade: string;
  crm: string;
  celular: string;
  atendimento: any[];
  cpf: string;
}

export interface IAtendimento {
  semana: string;
  horario: number;
  max: number;
}
