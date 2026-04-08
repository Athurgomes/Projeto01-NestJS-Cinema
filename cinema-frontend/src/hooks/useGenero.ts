import { useState, useCallback } from 'react';
import { api } from '../api/axios';
import { IGenero } from '../types/genero.types';

export const useGenero = () => {
  const [generos, setGeneros] = useState<IGenero[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeneros = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/generos');
      setGeneros(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar gêneros');
    } finally {
      setLoading(false);
    }
  }, []);

  const createGenero = async (data: Omit<IGenero, 'id'>) => {
    try {
      await api.post('/generos', data);
      await fetchGeneros(); // Recarrega a lista após criar
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar gênero');
      return false;
    }
  };

  const updateGenero = async (id: number, data: Partial<IGenero>) => {
    try {
      await api.patch(`/generos/${id}`, data);
      await fetchGeneros();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar gênero');
      return false;
    }
  };

  const deleteGenero = async (id: number) => {
    try {
      await api.delete(`/generos/${id}`);
      await fetchGeneros();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar gênero');
      return false;
    }
  };

  return { generos, loading, error, fetchGeneros, createGenero, updateGenero, deleteGenero };
};