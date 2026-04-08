import React, { useEffect, useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { SalaForm } from './SalaForm';
import { useSala } from '../../hooks/useSala';
import { ISala } from '../../types/sala.types';

export const SalaPage: React.FC = () => {
  const { salas, loading, error, fetchSalas, createSala, updateSala, deleteSala } = useSala();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salaEmEdicao, setSalaEmEdicao] = useState<ISala | null>(null);

  useEffect(() => {
    fetchSalas();
  }, [fetchSalas]);

  const handleOpenCreate = () => {
    setSalaEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sala: ISala) => {
    setSalaEmEdicao(sala);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem a certeza que deseja excluir esta sala? Isso pode afetar sessões vinculadas.')) {
      await deleteSala(id);
    }
  };

  const handleSubmit = async (data: Omit<ISala, 'id'>) => {
    let success = false;
    if (salaEmEdicao) {
      success = await updateSala(salaEmEdicao.id, data);
    } else {
      success = await createSala(data);
    }
    
    if (success) setIsModalOpen(false);
    return success;
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Salas</h1>
          <p className="text-text-muted text-sm">Gerencie os espaços físicos de exibição.</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Nova Sala</Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">{error}</div>}

      <div className="bg-surface rounded-lg border border-border">
        {loading && salas.length === 0 ? (
          <div className="p-8 text-center text-text-muted">A carregar...</div>
        ) : salas.length === 0 ? (
          <div className="p-8 text-center text-text-muted">Nenhuma sala cadastrada.</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>Número/Nome</Table.Th>
                <Table.Th>Capacidade</Table.Th>
                <Table.Th className="text-right">Ações</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {salas.map((sala) => (
                <Table.Row key={sala.id}>
                  <Table.Td className="font-medium text-text-main">{sala.numero}</Table.Td>
                  <Table.Td>{sala.capacidade} lugares</Table.Td>
                  <Table.Td className="text-right">
                    <Button variant="secondary" className="mr-2 text-xs py-1 px-3" onClick={() => handleOpenEdit(sala)}>Editar</Button>
                    <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleDelete(sala.id)}>Excluir</Button>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={salaEmEdicao ? 'Editar Sala' : 'Nova Sala'}>
        <SalaForm initialData={salaEmEdicao} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};