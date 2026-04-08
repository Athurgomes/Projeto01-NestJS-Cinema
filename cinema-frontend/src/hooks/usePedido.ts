import { useState, useCallback } from 'react';
import { api } from '../api/axios'; 
import { IPedido } from '../types/pedido.types';

export const usePedido = () => {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/pedidos');
      setPedidos(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPedido = useCallback(async (frontendData: { ingressoIds: number[]; lancheComboIds: number[] }) => {
    try {
      setLoading(true);
      setError(null);

      const backendPayload = {
        ingressosIds: frontendData.ingressoIds,
        lanchesIds: frontendData.lancheComboIds
      };

      await api.post('/pedidos', backendPayload);
      
      await fetchPedidos();
      return true;
    } catch (err: any) {
      const apiError = err.response?.data?.message;
      setError(Array.isArray(apiError) ? apiError.join(', ') : apiError || 'Erro ao criar pedido');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchPedidos]);

  const deletePedido = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/pedidos/${id}`);
      await fetchPedidos();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao excluir pedido');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchPedidos]);

  return { pedidos, loading, error, fetchPedidos, createPedido, deletePedido };
};