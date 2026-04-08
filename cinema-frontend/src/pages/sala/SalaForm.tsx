import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ISala } from '../../types/sala.types';

interface SalaFormProps {
  initialData?: ISala | null;
  onSubmit: (data: Omit<ISala, 'id'>) => Promise<boolean>;
  onCancel: () => void;
}

export const SalaForm: React.FC<SalaFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [numero, setNumero] = useState('');
  const [capacidade, setCapacidade] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNumero(initialData.numero);
      setCapacidade(initialData.capacidade);
    } else {
      setNumero('');
      setCapacidade('');
    }
  }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numero || capacidade === '') return;

    setIsSubmitting(true);
    const success = await onSubmit({ numero, capacidade: Number(capacidade) });
    
    if (success && !initialData) {
      setNumero('');
      setCapacidade('');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input 
        label="Número/Identificação da Sala" 
        placeholder="Ex: Sala 01, IMAX, VIP..." 
        value={numero} 
        onChange={(e) => setNumero(e.target.value)} 
        required 
      />
      <Input 
        label="Capacidade Total (Lugares)" 
        type="number" 
        min="1"
        value={capacidade} 
        onChange={(e) => setCapacidade(e.target.value ? Number(e.target.value) : '')} 
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