import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ILancheCombo } from '../../types/lancheCombo.types';

interface LancheComboFormProps {
  initialData?: ILancheCombo | null;
  onSubmit: (data: Omit<ILancheCombo, 'id'>) => Promise<boolean>;
  onCancel: () => void;
}

export const LancheComboForm: React.FC<LancheComboFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
      setDescricao(initialData.descricao || '');
      setPreco(initialData.preco);
    } else {
      setNome('');
      setDescricao('');
      setPreco('');
    }
  }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco) return;

    setIsSubmitting(true);
    const success = await onSubmit({ 
      nome, 
      descricao: descricao || undefined, 
      preco: Number(preco) 
    });

    if (success && !initialData) {
      setNome('');
      setDescricao('');
      setPreco('');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Nome do Lanche/Combo" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <Input label="Descrição (Opcional)" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <Input 
        label="Preço (R$)" 
        type="number" 
        step="0.01" 
        min="0"
        value={preco} 
        onChange={(e) => setPreco(e.target.value ? Number(e.target.value) : '')} 
        required 
      />

      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};