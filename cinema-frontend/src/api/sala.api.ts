import { api } from './axios';
import { ISala } from '../types/sala.types';

export const salaApi = {
  getAll: () => api.get<ISala[]>('/salas'),
  getById: (id: number) => api.get<ISala>(`/salas/${id}`),
  create: (data: Omit<ISala, 'id'>) => api.post<ISala>('/salas', data),
  update: (id: number, data: Partial<ISala>) => api.patch<ISala>(`/salas/${id}`, data),
  delete: (id: number) => api.delete(`/salas/${id}`),
};