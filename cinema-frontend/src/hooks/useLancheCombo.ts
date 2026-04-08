import { useState, useCallback } from 'react';
import { api } from '../api/axios';
import { ILancheCombo } from '../types/lancheCombo.types';

export const useLancheCombo = () => {
  const [lanchesCombos, setLanchesCombos] = useState<ILancheCombo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLanchesCombos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/lanches-combos');
      setLanchesCombos(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar lanches e combos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLancheCombo = async (data: Omit<ILancheCombo, 'id'>) => {
    try {
      await api.post('/lanches-combos', data);
      await fetchLanchesCombos();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar lanche/combo');
      return false;
    }
  };

  const updateLancheCombo = async (id: number, data: Partial<ILancheCombo>) => {
    try {
      await api.patch(`/lanches-combos/${id}`, data);
      await fetchLanchesCombos();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar lanche/combo');
      return false;
    }
  };

  const deleteLancheCombo = async (id: number) => {
    try {
      await api.delete(`/lanches-combos/${id}`);
      await fetchLanchesCombos();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar lanche/combo');
      return false;
    }
  };

  return { lanchesCombos, loading, error, fetchLanchesCombos, createLancheCombo, updateLancheCombo, deleteLancheCombo };
};