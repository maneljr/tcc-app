export interface IModalRegister {
  open: boolean;
  onClose: () => void;
  day: number;
  month: Date;
}

export interface IRegister {
  local: string;
  medico: string;
  horario: string;
}
