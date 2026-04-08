import React, { useEffect, useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { FilmeForm } from './FilmeForm';
import { useFilme } from '../../hooks/useFilme';
import { useGenero } from '../../hooks/useGenero'; // Precisamos disto para a combobox!
import { IFilme } from '../../types/filme.types';

export const FilmePage: React.FC = () => {
  const { filmes, loading: loadingFilmes, error: errorFilmes, fetchFilmes, createFilme, updateFilme, deleteFilme } = useFilme();
  const { generos, fetchGeneros } = useGenero();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState<IFilme | null>(null);

  useEffect(() => {
    fetchFilmes();
    fetchGeneros(); // Carrega a lista de géneros para passar ao formulário
  }, [fetchFilmes, fetchGeneros]);

  const handleOpenCreate = () => {
    setFilmeEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (filme: IFilme) => {
    setFilmeEmEdicao(filme);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem a certeza que deseja excluir este filme?')) {
      await deleteFilme(id);
    }
  };

  const handleSubmit = async (data: Omit<IFilme, 'id' | 'genero'>) => {
    let success = false;
    if (filmeEmEdicao) {
      success = await updateFilme(filmeEmEdicao.id, data);
    } else {
      success = await createFilme(data);
    }
    
    if (success) setIsModalOpen(false);
    return success;
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Filmes</h1>
          <p className="text-text-muted text-sm">Catálogo de filmes disponíveis para exibição.</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Novo Filme</Button>
      </div>

      {errorFilmes && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">{errorFilmes}</div>}

      <div className="bg-surface rounded-lg border border-border">
        {loadingFilmes && filmes.length === 0 ? (
          <div className="p-8 text-center text-text-muted">A carregar...</div>
        ) : filmes.length === 0 ? (
          <div className="p-8 text-center text-text-muted">Nenhum filme cadastrado.</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>Título</Table.Th>
                <Table.Th>Gênero</Table.Th>
                <Table.Th>Duração</Table.Th>
                <Table.Th>Classificação</Table.Th>
                <Table.Th className="text-right">Ações</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {filmes.map((filme) => (
                <Table.Row key={filme.id}>
                  <Table.Td className="font-medium text-text-main">{filme.titulo}</Table.Td>
                  <Table.Td>{filme.genero?.nome || `ID: ${filme.generoId}`}</Table.Td>
                  <Table.Td>{filme.duracao} min</Table.Td>
                  <Table.Td>
                    <Badge variant={filme.classificacaoEtaria === '18 anos' ? 'danger' : filme.classificacaoEtaria === 'Livre' ? 'success' : 'warning'}>
                      {filme.classificacaoEtaria}
                    </Badge>
                  </Table.Td>
                  <Table.Td className="text-right">
                    <Button variant="secondary" className="mr-2 text-xs py-1 px-3" onClick={() => handleOpenEdit(filme)}>Editar</Button>
                    <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleDelete(filme.id)}>Excluir</Button>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={filmeEmEdicao ? 'Editar Filme' : 'Novo Filme'}>
        <FilmeForm initialData={filmeEmEdicao} generos={generos} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};