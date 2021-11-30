export interface IPlace {
  id: string;
  bairro: string;
  cep: string;
  cidade: string;
  nome: string;
  numero: string;
  rua: string;
}

export type IPlaceUpdate = Omit<IPlace, 'id'>;

export interface IModalUpdatePlace {
  place?: IPlace;
  open: boolean;
  onClose: () => void;
}
