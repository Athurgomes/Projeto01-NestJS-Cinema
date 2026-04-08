import { api } from './axios';
import { IFilme } from '../types/filme.types';

export const filmeApi = {
  getAll: () => api.get<IFilme[]>('/filmes'),
  getById: (id: number) => api.get<IFilme>(`/filmes/${id}`),
  create: (data: Omit<IFilme, 'id' | 'genero'>) => api.post<IFilme>('/filmes', data),
  update: (id: number, data: Partial<IFilme>) => api.patch<IFilme>(`/filmes/${id}`, data),
  delete: (id: number) => api.delete(`/filmes/${id}`),
};