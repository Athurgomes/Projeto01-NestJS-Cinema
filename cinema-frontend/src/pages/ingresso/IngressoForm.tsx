import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { IIngresso } from '../../types/ingresso.types';
import { ISessao } from '../../types/sessao.types';

interface IngressoFormProps {
  initialData?: IIngresso | null;
  sessoes: ISessao[];
  onSubmit: (data: Omit<IIngresso, 'id' | 'sessao'>) => Promise<boolean>;
  onCancel: () => void;
}

export const IngressoForm: React.FC<IngressoFormProps> = ({ initialData, sessoes, onSubmit, onCancel }) => {
  const [sessaoId, setSessaoId] = useState<number | ''>('');
  const [tipo, setTipo] = useState('');
  const [valorPago, setValorPago] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setSessaoId(initialData.sessaoId);
      setTipo(initialData.tipo);
      setValorPago(initialData.valorPago);
    } else {
      setSessaoId('');
      setTipo('');
      setValorPago('');
    }
  }, [initialData]);

  // Se o utilizador mudar a sessão, podemos tentar preencher o valor pago automaticamente baseado no valor da sessão
  const handleSessaoChange = (id: string) => {
    const sId = Number(id);
    setSessaoId(sId);
    if (!initialData) {
      const sessaoSelecionada = sessoes.find(s => s.id === sId);
      if (sessaoSelecionada) {
        setValorPago(tipo === 'Meia' ? sessaoSelecionada.valorIngresso / 2 : sessaoSelecionada.valorIngresso);
      }
    }
  };

    const handleTipoChange = (novoTipo: string) => {
    setTipo(novoTipo);
    
        if (!initialData && sessaoId) {
            const sessaoSelecionada = sessoes.find(s => s.id === sessaoId);
            if (sessaoSelecionada) {
            // REGRA DE NEGÓCIO: Se for cortesia, o valor é sempre 0
            if (novoTipo === 'Cortesia') {
                setValorPago(0);
            } else if (novoTipo === 'Meia') {
                setValorPago(sessaoSelecionada.valorIngresso / 2);
            } else {
                setValorPago(sessaoSelecionada.valorIngresso);
            }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessaoId || !tipo || valorPago === '') return;

    setIsSubmitting(true);
    const success = await onSubmit({ 
      sessaoId: Number(sessaoId), 
      tipo, 
      valorPago: Number(valorPago) 
    });

    if (success && !initialData) {
      setSessaoId('');
      setTipo('');
      setValorPago('');
    }

    setIsSubmitting(false);
  };

  const formatarData = (dataIso: string) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(dataIso));

  const sessoesOptions = sessoes.map(s => ({ 
    value: s.id, 
    label: `${s.filme?.titulo || 'Filme Desconhecido'} - ${formatarData(s.dataHorario)} (Sala ${s.sala?.numero || '?'})` 
  }));

  const tiposOptions = [
    { value: 'Inteira', label: 'Inteira' },
    { value: 'Meia', label: 'Meia Entrada' },
    { value: 'Cortesia', label: 'Cortesia (Isento)' },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select 
        label="Sessão" 
        value={sessaoId} 
        onChange={(e) => handleSessaoChange(e.target.value)} 
        options={sessoesOptions} 
        required 
        disabled={!!initialData} // Não permite mudar a sessão de um ingresso já emitido
      />
      
      <Select 
        label="Tipo de Ingresso" 
        value={tipo} 
        onChange={(e) => handleTipoChange(e.target.value)} 
        options={tiposOptions} 
        required 
      />
      
      <Input 
        label="Valor Pago (R$)" 
        type="number" 
        step="0.01" 
        min="0"
        value={valorPago} 
        onChange={(e) => setValorPago(e.target.value ? Number(e.target.value) : '')} 
        required 
      />

      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Emitir Ingresso'}
        </Button>
      </div>
    </form>
  );
};