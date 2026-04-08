import { IFilme } from './filme.types';
import { ISala } from './sala.types';

export interface ISessao {
  id: number;
  filmeId: number;
  salaId: number;
  dataHorario: string; 
  valorIngresso: number;
  filme?: IFilme;
  sala?: ISala;
}