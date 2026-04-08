import { useState, useCallback } from 'react';
import { api } from '../api/axios';
import { ISala } from '../types/sala.types';

export const useSala = () => {
  const [salas, setSalas] = useState<ISala[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSalas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/salas');
      setSalas(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar salas');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSala = async (data: Omit<ISala, 'id'>) => {
    try {
      await api.post('/salas', data);
      await fetchSalas();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar sala');
      return false;
    }
  };

  const updateSala = async (id: number, data: Partial<ISala>) => {
    try {
      await api.patch(`/salas/${id}`, data);
      await fetchSalas();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar sala');
      return false;
    }
  };

  const deleteSala = async (id: number) => {
    try {
      await api.delete(`/salas/${id}`);
      await fetchSalas();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar sala');
      return false;
    }
  };

  return { salas, loading, error, fetchSalas, createSala, updateSala, deleteSala };
};