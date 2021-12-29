export interface IModalRegister {
  open: boolean;
  onClose: () => void;
  day: number;
  month: string;
}

export interface IRegister {
  local: string;
  medico: string;
  horario: string;
}
