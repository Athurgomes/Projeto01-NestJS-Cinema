import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { IIngresso } from '../../types/ingresso.types';
import { ILancheCombo } from '../../types/lancheCombo.types';

interface PedidoFormProps {
  ingressosDisponiveis: IIngresso[];
  lanchesDisponiveis: ILancheCombo[];
  onSubmit: (data: { ingressoIds: number[]; lancheComboIds: number[] }) => Promise<boolean>;
  onCancel: () => void;
}

export const PedidoForm: React.FC<PedidoFormProps> = ({ 
  ingressosDisponiveis, 
  lanchesDisponiveis, 
  onSubmit, 
  onCancel 
}) => {
  const [selectedIngressos, setSelectedIngressos] = useState<number[]>([]);
  const [selectedLanches, setSelectedLanches] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSelection = (id: any, type: 'ingresso' | 'lanche') => {
    const numericId = Number(id);
    if (type === 'ingresso') {
      setSelectedIngressos(prev => 
        prev.includes(numericId) ? prev.filter(i => i !== numericId) : [...prev, numericId]
      );
    } else {
      setSelectedLanches(prev => 
        prev.includes(numericId) ? prev.filter(i => i !== numericId) : [...prev, numericId]
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIngressos.length === 0 && selectedLanches.length === 0) {
      alert('Selecione pelo menos um item para criar o pedido.');
      return;
    }

    setIsSubmitting(true);
    
    const success = await onSubmit({ ingressoIds: selectedIngressos, lancheComboIds: selectedLanches })
    
    if (success) {
      setSelectedIngressos([]);
      setSelectedLanches([]);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
        
        {/* Ingressos */}
        <div>
          <h4 className="text-sm font-semibold text-text-muted mb-3 uppercase tracking-wider">Ingressos em aberto</h4>
          <div className="flex flex-col gap-2">
            {ingressosDisponiveis.length === 0 ? (
              <p className="text-sm text-text-muted italic">Nenhum ingresso disponível.</p>
            ) : (
              ingressosDisponiveis.map((ing) => (
                <label key={ing.id} className={`flex justify-between items-center p-3 rounded border cursor-pointer transition-colors ${selectedIngressos.includes(Number(ing.id)) ? 'bg-accent/10 border-accent' : 'bg-elevated border-border'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="accent-accent" checked={selectedIngressos.includes(Number(ing.id))} onChange={() => toggleSelection(ing.id, 'ingresso')} />
                    <span className="text-sm">#{ing.id} - {ing.sessao?.filme?.titulo} ({ing.tipo})</span>
                  </div>
                  <span className="text-sm font-bold">R$ {ing.valorPago}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Lanches */}
        <div>
          <h4 className="text-sm font-semibold text-text-muted mb-3 uppercase tracking-wider">Lanches & Combos</h4>
          <div className="grid grid-cols-1 gap-2">
            {lanchesDisponiveis.map((lanche) => (
              <label key={lanche.id} className={`flex justify-between items-center p-3 rounded border cursor-pointer transition-colors ${selectedLanches.includes(Number(lanche.id)) ? 'bg-accent/10 border-accent' : 'bg-elevated border-border'}`}>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-accent" checked={selectedLanches.includes(Number(lanche.id))} onChange={() => toggleSelection(lanche.id, 'lanche')} />
                  <span className="text-sm">{lanche.nome}</span>
                </div>
                <span className="text-sm font-bold">R$ {lanche.preco}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Finalizando...' : 'Finalizar Pedido'}
        </Button>
      </div>
    </form>
  );
};