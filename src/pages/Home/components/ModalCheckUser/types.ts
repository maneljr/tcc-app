import { ISolicitation } from '../Calendar/types';

export interface IModalCheckUser {
  open: boolean;
  onClose: () => void;
  solicitations: ISolicitation[];
  day: number;
  month: string;
}
