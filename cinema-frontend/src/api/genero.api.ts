import { api } from './axios';
import { IGenero } from '../types/genero.types';

export const generoApi = {
  getAll: () => api.get<IGenero[]>('/generos'),
  getById: (id: number) => api.get<IGenero>(`/generos/${id}`),
  create: (data: Omit<IGenero, 'id'>) => api.post<IGenero>('/generos', data),
  update: (id: number, data: Partial<IGenero>) => api.patch<IGenero>(`/generos/${id}`, data),
  delete: (id: number) => api.delete(`/generos/${id}`),
};