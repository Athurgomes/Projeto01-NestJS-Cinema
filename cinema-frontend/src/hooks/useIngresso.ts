import { useState, useCallback } from 'react';
import { api } from '../api/axios';
import { IIngresso } from '../types/ingresso.types';

export const useIngresso = () => {
  const [ingressos, setIngressos] = useState<IIngresso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIngressos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/ingressos');
      setIngressos(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar ingressos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createIngresso = async (data: Omit<IIngresso, 'id' | 'sessao'>) => {
    try {
      await api.post('/ingressos', data);
      await fetchIngressos();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar ingresso');
      return false;
    }
  };

  const updateIngresso = async (id: number, data: Partial<IIngresso>) => {
    try {
      await api.patch(`/ingressos/${id}`, data);
      await fetchIngressos();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar ingresso');
      return false;
    }
  };

  const deleteIngresso = async (id: number) => {
    try {
      await api.delete(`/ingressos/${id}`);
      await fetchIngressos();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar ingresso');
      return false;
    }
  };

  return { ingressos, loading, error, fetchIngressos, createIngresso, updateIngresso, deleteIngresso };
};