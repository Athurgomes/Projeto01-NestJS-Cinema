import { useState, useCallback } from 'react';
import { api } from '../api/axios';
import { IFilme } from '../types/filme.types';

export const useFilme = () => {
  const [filmes, setFilmes] = useState<IFilme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFilmes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/filmes');
      setFilmes(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar filmes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createFilme = async (data: Omit<IFilme, 'id' | 'genero'>) => {
    try {
      await api.post('/filmes', data);
      await fetchFilmes();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar filme');
      return false;
    }
  };

  const updateFilme = async (id: number, data: Partial<IFilme>) => {
    try {
      await api.patch(`/filmes/${id}`, data);
      await fetchFilmes();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar filme');
      return false;
    }
  };

  const deleteFilme = async (id: number) => {
    try {
      await api.delete(`/filmes/${id}`);
      await fetchFilmes();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar filme');
      return false;
    }
  };

  return { filmes, loading, error, fetchFilmes, createFilme, updateFilme, deleteFilme };
};