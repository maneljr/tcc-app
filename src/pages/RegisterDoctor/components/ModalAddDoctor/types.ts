export interface ImodalAddDoctor {
  open: boolean;
  onClose: () => void;
}

export interface IAddDoctor {
  nome: string;
  especialidade: string;
  crm: string;
  celular: string;
  atendimento: string[];
  cpf: string;
}
