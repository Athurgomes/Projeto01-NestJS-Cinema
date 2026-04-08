import React, { useEffect, useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { GeneroForm } from './GeneroForm';
import { useGenero } from '../../hooks/useGenero';
import { IGenero } from '../../types/genero.types';

export const GeneroPage: React.FC = () => {
  const { generos, loading, error, fetchGeneros, createGenero, updateGenero, deleteGenero } = useGenero();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generoEmEdicao, setGeneroEmEdicao] = useState<IGenero | null>(null);

  useEffect(() => {
    fetchGeneros();
  }, [fetchGeneros]);

  const handleOpenCreate = () => {
    setGeneroEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (genero: IGenero) => {
    setGeneroEmEdicao(genero);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem a certeza que deseja excluir este gênero?')) {
      await deleteGenero(id);
    }
  };

  const handleSubmit = async (data: Omit<IGenero, 'id'>) => {
    let success = false;
    if (generoEmEdicao) {
      success = await updateGenero(generoEmEdicao.id, data);
    } else {
      success = await createGenero(data);
    }
    
    if (success) setIsModalOpen(false);
    return success;
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Gêneros</h1>
          <p className="text-text-muted text-sm">Gerencie as categorias dos filmes do cinema.</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Novo Gênero</Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">{error}</div>}

      <div className="bg-surface rounded-lg border border-border">
        {loading && generos.length === 0 ? (
          <div className="p-8 text-center text-text-muted">A carregar...</div>
        ) : generos.length === 0 ? (
          <div className="p-8 text-center text-text-muted">Nenhum gênero cadastrado.</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th className="w-16">ID</Table.Th>
                <Table.Th>Nome</Table.Th>
                <Table.Th className="text-right">Ações</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {generos.map((genero) => (
                <Table.Row key={genero.id}>
                  <Table.Td className="text-text-muted">#{genero.id}</Table.Td>
                  <Table.Td className="font-medium text-text-main">{genero.nome}</Table.Td>
                  <Table.Td className="text-right">
                    <Button variant="secondary" className="mr-2 text-xs py-1 px-3" onClick={() => handleOpenEdit(genero)}>
                      Editar
                    </Button>
                    <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleDelete(genero.id)}>
                      Excluir
                    </Button>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={generoEmEdicao ? 'Editar Gênero' : 'Novo Gênero'}
      >
        <GeneroForm 
          initialData={generoEmEdicao} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};