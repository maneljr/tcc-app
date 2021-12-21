export interface IModalRegister {
  open: boolean;
  onClose: () => void;
}

export interface IRegister {
  local: string;
  medico: string;
  horario: string;
}
