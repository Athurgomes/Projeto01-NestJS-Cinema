import React, { useEffect, useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { SessaoForm } from './SessaoForm';
import { useSessao } from '../../hooks/useSessao';
import { useFilme } from '../../hooks/useFilme';
import { useSala } from '../../hooks/useSala';
import { ISessao } from '../../types/sessao.types';

export const SessaoPage: React.FC = () => {
  const { sessoes, loading, error, fetchSessoes, createSessao, updateSessao, deleteSessao } = useSessao();
  const { filmes, fetchFilmes } = useFilme();
  const { salas, fetchSalas } = useSala();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessaoEmEdicao, setSessaoEmEdicao] = useState<ISessao | null>(null);

  // Carrega as três entidades necessárias quando a página abre
  useEffect(() => {
    fetchSessoes();
    fetchFilmes();
    fetchSalas();
  }, [fetchSessoes, fetchFilmes, fetchSalas]);

  const handleOpenCreate = () => {
    setSessaoEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sessao: ISessao) => {
    setSessaoEmEdicao(sessao);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem a certeza que deseja excluir esta sessão?')) {
      await deleteSessao(id);
    }
  };

  const handleSubmit = async (data: Omit<ISessao, 'id' | 'filme' | 'sala'>) => {
    let success = false;
    if (sessaoEmEdicao) {
      success = await updateSessao(sessaoEmEdicao.id, data);
    } else {
      success = await createSessao(data);
    }
    
    if (success) setIsModalOpen(false);
    return success;
  };

  // Formatadores visuais
  const formatarData = (dataIso: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(dataIso));
  };
  
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Sessões</h1>
          <p className="text-text-muted text-sm">Programe a exibição dos filmes nas salas.</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Nova Sessão</Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">{error}</div>}

      <div className="bg-surface rounded-lg border border-border">
        {loading && sessoes.length === 0 ? (
          <div className="p-8 text-center text-text-muted">A carregar...</div>
        ) : sessoes.length === 0 ? (
          <div className="p-8 text-center text-text-muted">Nenhuma sessão programada.</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>Data & Hora</Table.Th>
                <Table.Th>Filme</Table.Th>
                <Table.Th>Sala</Table.Th>
                <Table.Th>Valor Base</Table.Th>
                <Table.Th className="text-right">Ações</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sessoes.map((sessao) => (
                <Table.Row key={sessao.id}>
                  <Table.Td className="font-medium text-accent">
                    {formatarData(sessao.dataHorario)}
                  </Table.Td>
                  <Table.Td className="text-text-main">
                    {sessao.filme?.titulo || `Filme ID: ${sessao.filmeId}`}
                  </Table.Td>
                  <Table.Td>
                    {sessao.sala?.numero || `Sala ID: ${sessao.salaId}`}
                  </Table.Td>
                  <Table.Td className="text-green-500">
                    {formatarMoeda(sessao.valorIngresso)}
                  </Table.Td>
                  <Table.Td className="text-right">
                    <Button variant="secondary" className="mr-2 text-xs py-1 px-3" onClick={() => handleOpenEdit(sessao)}>Editar</Button>
                    <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleDelete(sessao.id)}>Excluir</Button>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={sessaoEmEdicao ? 'Editar Sessão' : 'Nova Sessão'}>
        <SessaoForm 
          initialData={sessaoEmEdicao} 
          filmes={filmes} 
          salas={salas} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};