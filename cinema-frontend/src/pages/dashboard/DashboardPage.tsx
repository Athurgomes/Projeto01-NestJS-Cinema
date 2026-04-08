import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { useFilme } from '../../hooks/useFilme';
import { useSessao } from '../../hooks/useSessao';
import { usePedido } from '../../hooks/usePedido';
import { useIngresso } from '../../hooks/useIngresso';

export const DashboardPage: React.FC = () => {
  const { filmes, fetchFilmes } = useFilme();
  const { sessoes, fetchSessoes } = useSessao();
  const { pedidos, fetchPedidos } = usePedido();
  const { ingressos, fetchIngressos } = useIngresso();

  // Carrega os dados assim que a página é montada
  useEffect(() => {
    fetchFilmes();
    fetchSessoes();
    fetchPedidos();
    fetchIngressos();
  }, [fetchFilmes, fetchSessoes, fetchPedidos, fetchIngressos]);

  // Cálculos rápidos para os cards
  const totalFilmes = filmes.length;
  const totalSessoes = sessoes.length;
  const ingressosVendidos = ingressos.length;
  const receitaPedidos = pedidos.reduce((acc, p) => acc + Number(p.valorTotal || 0), 0);
  const receitaIngressosAvulsos = ingressos
    .filter(i => !i.pedidoId)
    .reduce((acc, i) => acc + Number(i.valorPago || 0), 0);

  const receitaTotal = receitaPedidos + receitaIngressosAvulsos;

  // Formatação de moeda (R$)
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  // Formatação de data
  const formatarData = (dataIso: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dataIso));
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-text-main mb-1">Dashboard</h1>
        <p className="text-text-muted text-sm">Bem-vindo ao painel de controlo do CineWeb.</p>
      </div>

      {/* Grid de Cards Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col gap-2 border-l-4 border-l-accent">
          <span className="text-text-muted text-sm font-medium uppercase tracking-wider">Total de Filmes</span>
          <span className="text-3xl font-bold text-text-main">{totalFilmes}</span>
        </Card>
        
        <Card className="flex flex-col gap-2">
          <span className="text-text-muted text-sm font-medium uppercase tracking-wider">Sessões Programadas</span>
          <span className="text-3xl font-bold text-text-main">{totalSessoes}</span>
        </Card>

        <Card className="flex flex-col gap-2">
          <span className="text-text-muted text-sm font-medium uppercase tracking-wider">Ingressos Vendidos</span>
          <span className="text-3xl font-bold text-text-main">{ingressosVendidos}</span>
        </Card>

        <Card className="flex flex-col gap-2 border-l-4 border-l-green-600">
          <span className="text-text-muted text-sm font-medium uppercase tracking-wider">Receita Total</span>
          <span className="text-3xl font-bold text-green-500">{formatarMoeda(receitaTotal)}</span>
        </Card>
      </div>

      {/* Tabela de Próximas Sessões */}
      <div>
        <h2 className="text-lg font-semibold text-text-main mb-4">Próximas Sessões</h2>
        {sessoes.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>Data & Hora</Table.Th>
                <Table.Th>Filme</Table.Th>
                <Table.Th>Sala</Table.Th>
                <Table.Th>Valor do Ingresso</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {/* Mostra apenas as 5 primeiras sessões */}
              {sessoes.slice(0, 5).map((sessao) => (
                <Table.Row key={sessao.id}>
                  <Table.Td className="font-medium text-accent">
                    {formatarData(sessao.dataHorario)}
                  </Table.Td>
                  {}
                  <Table.Td>{sessao.filme?.titulo || `Filme ID: ${sessao.filmeId}`}</Table.Td>
                  <Table.Td>{sessao.sala?.numero || `Sala ID: ${sessao.salaId}`}</Table.Td>
                  <Table.Td>{formatarMoeda(sessao.valorIngresso)}</Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="bg-surface border border-border rounded-lg p-8 text-center text-text-muted">
            Nenhuma sessão programada no momento.
          </div>
        )}
      </div>
    </div>
  );
};