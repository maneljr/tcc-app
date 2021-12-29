import { ISolicitation } from '../Calendar/types';

export interface IModalCheck {
  open: boolean;
  onClose: () => void;
  solicitations: ISolicitation[];
  day: number;
  month: string;
}
