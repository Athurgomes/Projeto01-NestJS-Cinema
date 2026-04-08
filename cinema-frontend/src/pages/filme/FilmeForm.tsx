import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { IFilme } from '../../types/filme.types';
import { IGenero } from '../../types/genero.types';

interface FilmeFormProps {
  initialData?: IFilme | null;
  generos: IGenero[];
  onSubmit: (data: Omit<IFilme, 'id' | 'genero'>) => Promise<boolean>;
  onCancel: () => void;
}

export const FilmeForm: React.FC<FilmeFormProps> = ({ initialData, generos, onSubmit, onCancel }) => {
  const [titulo, setTitulo] = useState('');
  const [generoId, setGeneroId] = useState<number | ''>('');
  const [duracao, setDuracao] = useState<number | ''>('');
  const [classificacaoEtaria, setClassificacaoEtaria] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo);
      setGeneroId(initialData.generoId);
      setDuracao(initialData.duracao);
      setClassificacaoEtaria(initialData.classificacaoEtaria);
    } else {
      setTitulo('');
      setGeneroId('');
      setDuracao('');
      setClassificacaoEtaria('');
    }
  }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !generoId || !duracao || !classificacaoEtaria) return;

    setIsSubmitting(true);
    const success = await onSubmit({ 
      titulo, 
      generoId: Number(generoId), 
      duracao: Number(duracao), 
      classificacaoEtaria 
    });
    
    // Uso da variável success para limpar o formulário em novas criações
    if (success && !initialData) {
      setTitulo('');
      setGeneroId('');
      setDuracao('');
      setClassificacaoEtaria('');
    }
    
    setIsSubmitting(false);
  };

  // Mapeia os generos para o formato exigido pelo Select
  const generosOptions = generos.map(g => ({ value: g.id, label: g.nome }));

  const classificacoesOptions = [
    { value: 'Livre', label: 'Livre' },
    { value: '10 anos', label: '10 anos' },
    { value: '12 anos', label: '12 anos' },
    { value: '14 anos', label: '14 anos' },
    { value: '16 anos', label: '16 anos' },
    { value: '18 anos', label: '18 anos' },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Título do Filme" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      
      <Select 
        label="Gênero" 
        value={generoId} 
        onChange={(e) => setGeneroId(Number(e.target.value))} 
        options={generosOptions} 
        required 
      />
      
      <Input 
        label="Duração (em minutos)" 
        type="number" 
        min="1"
        value={duracao} 
        onChange={(e) => setDuracao(e.target.value ? Number(e.target.value) : '')} 
        required 
      />
      
      <Select 
        label="Classificação Etária" 
        value={classificacaoEtaria} 
        onChange={(e) => setClassificacaoEtaria(e.target.value)} 
        options={classificacoesOptions} 
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