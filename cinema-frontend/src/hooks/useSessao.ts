import { useState, useCallback } from 'react';
import { api } from '../api/axios';
import { ISessao } from '../types/sessao.types';

export const useSessao = () => {
  const [sessoes, setSessoes] = useState<ISessao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessoes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/sessoes');
      setSessoes(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar sessões');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSessao = async (data: Omit<ISessao, 'id' | 'filme' | 'sala'>) => {
    try {
      await api.post('/sessoes', data);
      await fetchSessoes();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar sessão');
      return false;
    }
  };

  const updateSessao = async (id: number, data: Partial<ISessao>) => {
    try {
      await api.patch(`/sessoes/${id}`, data);
      await fetchSessoes();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar sessão');
      return false;
    }
  };

  const deleteSessao = async (id: number) => {
    try {
      await api.delete(`/sessoes/${id}`);
      await fetchSessoes();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar sessão');
      return false;
    }
  };

  return { sessoes, loading, error, fetchSessoes, createSessao, updateSessao, deleteSessao };
};