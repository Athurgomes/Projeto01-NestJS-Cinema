import { api } from './axios';
import { IIngresso } from '../types/ingresso.types';

export const ingressoApi = {
  getAll: () => api.get<IIngresso[]>('/ingressos'),
  getById: (id: number) => api.get<IIngresso>(`/ingressos/${id}`),
  create: (data: Omit<IIngresso, 'id' | 'sessao'>) => api.post<IIngresso>('/ingressos', data),
  update: (id: number, data: Partial<IIngresso>) => api.patch<IIngresso>(`/ingressos/${id}`, data),
  delete: (id: number) => api.delete(`/ingressos/${id}`),
};