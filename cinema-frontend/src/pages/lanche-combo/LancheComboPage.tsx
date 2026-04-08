import React, { useEffect, useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LancheComboForm } from './LancheComboForm';
import { useLancheCombo } from '../../hooks/useLancheCombo';
import { ILancheCombo } from '../../types/lancheCombo.types';

export const LancheComboPage: React.FC = () => {
  const { lanchesCombos, loading, error, fetchLanchesCombos, createLancheCombo, updateLancheCombo, deleteLancheCombo } = useLancheCombo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemEmEdicao, setItemEmEdicao] = useState<ILancheCombo | null>(null);

  useEffect(() => {
    fetchLanchesCombos();
  }, [fetchLanchesCombos]);

  const handleOpenCreate = () => {
    setItemEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ILancheCombo) => {
    setItemEmEdicao(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem a certeza que deseja excluir este item?')) {
      await deleteLancheCombo(id);
    }
  };

  const handleSubmit = async (data: Omit<ILancheCombo, 'id'>) => {
    let success = false;
    if (itemEmEdicao) {
      success = await updateLancheCombo(itemEmEdicao.id, data);
    } else {
      success = await createLancheCombo(data);
    }
    
    if (success) setIsModalOpen(false);
    return success;
  };

  const formatarMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Lanches & Combos</h1>
          <p className="text-text-muted text-sm">Gerencie os produtos da bomboniere do cinema.</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Novo Item</Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">{error}</div>}

      <div className="bg-surface rounded-lg border border-border">
        {loading && lanchesCombos.length === 0 ? (
          <div className="p-8 text-center text-text-muted">A carregar...</div>
        ) : lanchesCombos.length === 0 ? (
          <div className="p-8 text-center text-text-muted">Nenhum item cadastrado.</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>Nome</Table.Th>
                <Table.Th>Descrição</Table.Th>
                <Table.Th>Preço</Table.Th>
                <Table.Th className="text-right">Ações</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {lanchesCombos.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Td className="font-medium text-text-main">{item.nome}</Table.Td>
                  <Table.Td className="text-text-muted truncate max-w-xs">{item.descricao || '-'}</Table.Td>
                  <Table.Td className="text-green-500 font-medium">{formatarMoeda(item.preco)}</Table.Td>
                  <Table.Td className="text-right">
                    <Button variant="secondary" className="mr-2 text-xs py-1 px-3" onClick={() => handleOpenEdit(item)}>Editar</Button>
                    <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleDelete(item.id)}>Excluir</Button>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={itemEmEdicao ? 'Editar Item' : 'Novo Item'}>
        <LancheComboForm initialData={itemEmEdicao} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};