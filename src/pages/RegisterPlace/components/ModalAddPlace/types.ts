export interface ImodalAddPlace {
  open: boolean;
  onClose: () => void;
}

export interface IAddPlace {
  nome: string;
  rua: string;
  cidade: string;
  cep: string;
  bairro: string;
  numero: string;
}
