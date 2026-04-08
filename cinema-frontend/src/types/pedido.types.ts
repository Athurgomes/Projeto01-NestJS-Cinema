import { IIngresso } from './ingresso.types';
import { ILancheCombo } from './lancheCombo.types';

export interface IPedido {
  id: number;
  valorTotal: number;
  dataHora: string;
  ingressos?: IIngresso[];
  lanches?: ILancheCombo[];
}