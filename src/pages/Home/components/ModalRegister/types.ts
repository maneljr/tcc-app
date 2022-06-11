export interface IModalRegister {
  open: boolean;
  onClose: () => void;
  day: number;
  month: string;
  week: string;
}

export interface IRegister {
  local: string;
  medico: string;
  horario: string;
}
