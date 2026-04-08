import React, { useEffect, useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { IngressoForm } from './IngressoForm';
import { useIngresso } from '../../hooks/useIngresso';
import { useSessao } from '../../hooks/useSessao'; // Necessário para a combobox
import { IIngresso } from '../../types/ingresso.types';

export const IngressoPage: React.FC = () => {
  const { ingressos, loading, error, fetchIngressos, createIngresso, updateIngresso, deleteIngresso } = useIngresso();
  const { sessoes, fetchSessoes } = useSessao();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingressoEmEdicao, setIngressoEmEdicao] = useState<IIngresso | null>(null);

  useEffect(() => {
    fetchIngressos();
    fetchSessoes();
  }, [fetchIngressos, fetchSessoes]);

  const handleOpenCreate = () => {
    setIngressoEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ingresso: IIngresso) => {
    setIngressoEmEdicao(ingresso);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem a certeza que deseja cancelar (excluir) este ingresso?')) {
      await deleteIngresso(id);
    }
  };

  const handleSubmit = async (data: Omit<IIngresso, 'id' | 'sessao'>) => {
    let success = false;
    if (ingressoEmEdicao) {
      success = await updateIngresso(ingressoEmEdicao.id, data);
    } else {
      success = await createIngresso(data);
    }
    
    if (success) setIsModalOpen(false);
    return success;
  };

  const formatarMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Ingressos</h1>
          <p className="text-text-muted text-sm">Controle de emissão e venda de ingressos.</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Vender Ingresso</Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">{error}</div>}

      <div className="bg-surface rounded-lg border border-border">
        {loading && ingressos.length === 0 ? (
          <div className="p-8 text-center text-text-muted">A carregar...</div>
        ) : ingressos.length === 0 ? (
          <div className="p-8 text-center text-text-muted">Nenhum ingresso emitido.</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>ID</Table.Th>
                <Table.Th>Sessão</Table.Th>
                <Table.Th>Tipo</Table.Th>
                <Table.Th>Valor</Table.Th>
                <Table.Th className="text-right">Ações</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {ingressos.map((ingresso) => (
                <Table.Row key={ingresso.id}>
                  <Table.Td className="font-mono text-text-muted text-xs">#{ingresso.id}</Table.Td>
                  <Table.Td className="font-medium text-text-main">
                    {ingresso.sessao?.filme?.titulo || `Sessão ID: ${ingresso.sessaoId}`}
                  </Table.Td>
                  <Table.Td>
                    <Badge variant={ingresso.tipo === 'Inteira' ? 'default' : 'accent'}>{ingresso.tipo}</Badge>
                  </Table.Td>
                  <Table.Td className="text-green-500 font-medium">{formatarMoeda(ingresso.valorPago)}</Table.Td>
                  <Table.Td className="text-right">
                    <Button variant="secondary" className="mr-2 text-xs py-1 px-3" onClick={() => handleOpenEdit(ingresso)}>Editar</Button>
                    <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleDelete(ingresso.id)}>Cancelar</Button>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={ingressoEmEdicao ? 'Editar Ingresso' : 'Vender Novo Ingresso'}>
        <IngressoForm initialData={ingressoEmEdicao} sessoes={sessoes} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};