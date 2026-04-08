import { IGenero } from './genero.types';

export interface IFilme {
  id: number;
  titulo: string;
  generoId: number;
  duracao: number; // em minutos
  classificacaoEtaria: string;
  genero?: IGenero;
}