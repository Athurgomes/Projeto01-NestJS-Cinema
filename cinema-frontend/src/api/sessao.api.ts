import { api } from './axios';
import { ISessao } from '../types/sessao.types';

export const sessaoApi = {
  getAll: () => api.get<ISessao[]>('/sessoes'),
  getById: (id: number) => api.get<ISessao>(`/sessoes/${id}`),
  create: (data: Omit<ISessao, 'id' | 'filme' | 'sala'>) => api.post<ISessao>('/sessoes', data),
  update: (id: number, data: Partial<ISessao>) => api.patch<ISessao>(`/sessoes/${id}`, data),
  delete: (id: number) => api.delete(`/sessoes/${id}`),
};