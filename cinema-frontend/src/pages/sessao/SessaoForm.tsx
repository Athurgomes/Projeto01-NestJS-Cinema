import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { ISessao } from '../../types/sessao.types';
import { IFilme } from '../../types/filme.types';
import { ISala } from '../../types/sala.types';

interface SessaoFormProps {
  initialData?: ISessao | null;
  filmes: IFilme[];
  salas: ISala[];
  onSubmit: (data: Omit<ISessao, 'id' | 'filme' | 'sala'>) => Promise<boolean>;
  onCancel: () => void;
}

export const SessaoForm: React.FC<SessaoFormProps> = ({ initialData, filmes, salas, onSubmit, onCancel }) => {
  const [filmeId, setFilmeId] = useState<number | ''>('');
  const [salaId, setSalaId] = useState<number | ''>('');
  const [dataHorario, setDataHorario] = useState('');
  const [valorIngresso, setValorIngresso] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função auxiliar para formatar a data que vem da API (ISO) para o input do tipo datetime-local
  const formatDateTimeForInput = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (initialData) {
      setFilmeId(initialData.filmeId);
      setSalaId(initialData.salaId);
      setDataHorario(formatDateTimeForInput(initialData.dataHorario));
      setValorIngresso(initialData.valorIngresso);
    } else {
      setFilmeId('');
      setSalaId('');
      setDataHorario('');
      setValorIngresso('');
    }
  }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filmeId || !salaId || !dataHorario || valorIngresso === '') return;

    setIsSubmitting(true);
    const isoDate = new Date(dataHorario).toISOString();

    const success = await onSubmit({ 
      filmeId: Number(filmeId), 
      salaId: Number(salaId), 
      dataHorario: isoDate, 
      valorIngresso: Number(valorIngresso) 
    });
    
    if (success && !initialData) {
      setFilmeId('');
      setSalaId('');
      setDataHorario('');
      setValorIngresso('');
    }
    
    setIsSubmitting(false);
  };

  const filmesOptions = filmes.map(f => ({ value: f.id, label: f.titulo }));
  const salasOptions = salas.map(s => ({ value: s.id, label: `${s.numero} (${s.capacidade} lugares)` }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select 
        label="Filme" 
        value={filmeId} 
        onChange={(e) => setFilmeId(Number(e.target.value))} 
        options={filmesOptions} 
        required 
      />
      
      <Select 
        label="Sala" 
        value={salaId} 
        onChange={(e) => setSalaId(Number(e.target.value))} 
        options={salasOptions} 
        required 
      />
      
      <Input 
        label="Data e Horário" 
        type="datetime-local" 
        value={dataHorario} 
        onChange={(e) => setDataHorario(e.target.value)} 
        required 
      />

      <Input 
        label="Valor do Ingresso Base (Inteira)" 
        type="number" 
        step="0.01" 
        min="0"
        value={valorIngresso} 
        onChange={(e) => setValorIngresso(e.target.value ? Number(e.target.value) : '')} 
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