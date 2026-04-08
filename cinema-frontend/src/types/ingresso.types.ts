import { ISessao } from './sessao.types';

export interface IIngresso {
  id: number;
  sessaoId: number;
  pedidoId?: number | null;
  tipo: string; // Ex: "Inteira", "Meia"
  valorPago: number;
  sessao?: ISessao;
}