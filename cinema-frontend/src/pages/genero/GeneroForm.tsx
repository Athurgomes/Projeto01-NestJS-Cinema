import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { IGenero } from '../../types/genero.types';

interface GeneroFormProps {
  initialData?: IGenero | null;
  onSubmit: (data: Omit<IGenero, 'id'>) => Promise<boolean>;
  onCancel: () => void;
}

export const GeneroForm: React.FC<GeneroFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [nome, setNome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preenche o formulário se estivermos a editar um género existente
  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
    } else {
      setNome('');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    setIsSubmitting(true);
    const success = await onSubmit({ nome });
    setIsSubmitting(false);

    if (success && !initialData) {
      setNome(''); // Limpa o form após criar com sucesso
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome do Gênero"
        placeholder="Ex: Ação, Comédia, Drama..."
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting || !nome.trim()}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};