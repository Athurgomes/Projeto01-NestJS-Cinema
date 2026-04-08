import { api } from './axios';
import { ILancheCombo } from '../types/lancheCombo.types';

export const lancheComboApi = {
  getAll: () => api.get<ILancheCombo[]>('/lanches-combos'),
  getById: (id: number) => api.get<ILancheCombo>(`/lanches-combos/${id}`),
  create: (data: Omit<ILancheCombo, 'id'>) => api.post<ILancheCombo>('/lanches-combos', data),
  update: (id: number, data: Partial<ILancheCombo>) => api.patch<ILancheCombo>(`/lanches-combos/${id}`, data),
  delete: (id: number) => api.delete(`/lanches-combos/${id}`),
};