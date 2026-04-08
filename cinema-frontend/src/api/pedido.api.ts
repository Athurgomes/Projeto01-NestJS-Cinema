import { api } from './axios';
import { IPedido } from '../types/pedido.types';

export const pedidoApi = {
  getAll: () => api.get<IPedido[]>('/pedidos'),
  getById: (id: number) => api.get<IPedido>(`/pedidos/${id}`),
  create: (data: any) => api.post<IPedido>('/pedidos', data),
  update: (id: number, data: any) => api.patch<IPedido>(`/pedidos/${id}`, data),
  delete: (id: number) => api.delete(`/pedidos/${id}`),
};