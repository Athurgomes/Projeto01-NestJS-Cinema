import React, { useEffect, useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { PedidoForm } from './PedidoForm';
import { usePedido } from '../../hooks/usePedido';
import { useIngresso } from '../../hooks/useIngresso';
import { useLancheCombo } from '../../hooks/useLancheCombo';

export const PedidoPage: React.FC = () => {
  const { pedidos, loading, error, fetchPedidos, createPedido, deletePedido } = usePedido();
  const { ingressos, fetchIngressos } = useIngresso();
  const { lanchesCombos, fetchLanchesCombos } = useLancheCombo();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPedidos();
    fetchIngressos();
    fetchLanchesCombos();
  }, [fetchPedidos, fetchIngressos, fetchLanchesCombos]);

  const handleSubmit = async (data: { ingressoIds: number[]; lancheComboIds: number[] }) => {
    const success = await createPedido(data);
    
    if (success) {
      setIsModalOpen(false);
      fetchIngressos(); // Atualiza a lista de ingressos disponíveis (remove os vendidos)
    }

    return success; // Retorno obrigatório para satisfazer a tipagem do Form
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Excluir este pedido? Os itens associados serão desvinculados.')) {
      await deletePedido(id);
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarData = (dataIso: string) => {
    return new Date(dataIso).toLocaleString('pt-BR');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Pedidos</h1>
          <p className="text-text-muted text-sm">Vendas consolidadas de bilheteira e bomboniere.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Novo Pedido</Button>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">
          {error}
        </div>
      )}

      <div className="bg-surface rounded-lg border border-border">
        {loading && pedidos.length === 0 ? (
          <div className="p-8 text-center text-text-muted">A carregar...</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>ID</Table.Th>
                <Table.Th>Data & Hora</Table.Th>
                <Table.Th>Itens</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th className="text-right">Ações</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {pedidos.map((p) => (
                <Table.Row key={p.id}>
                  <Table.Td className="text-text-muted">#{p.id}</Table.Td>
                  <Table.Td>{formatarData(p.dataHora)}</Table.Td>
                  <Table.Td>
                    <span className="text-xs">
                      {(p.ingressos?.length || 0)} Ingr. + {(p.lanches?.length || 0)} Lanches
                    </span>
                  </Table.Td>
                  <Table.Td className="text-green-500 font-bold">
                    {formatarMoeda(p.valorTotal)}
                  </Table.Td>
                  <Table.Td className="text-right">
                    <Button 
                      variant="danger" 
                      className="text-xs py-1 px-3" 
                      onClick={() => handleDelete(p.id)}
                    >
                      Remover
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
        title="Finalizar Nova Venda"
      >
        <PedidoForm 
          ingressosDisponiveis={ingressos.filter(i => !i.pedidoId)}
          lanchesDisponiveis={lanchesCombos}
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};