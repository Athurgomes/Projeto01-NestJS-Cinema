import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

// Importação das páginas reais
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { GeneroPage } from '../pages/genero/GeneroPage';
import { FilmePage } from '../pages/filme/FilmePage';
import { SalaPage } from '../pages/sala/SalaPage';
import { SessaoPage } from '../pages/sessao/SessaoPage';
import { IngressoPage } from '../pages/ingresso/IngressoPage';
import { LancheComboPage } from '../pages/lanche-combo/LancheComboPage';
import { PedidoPage } from '../pages/pedido/PedidoPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'generos',
        element: <GeneroPage />,
      },
      {
        path: 'filmes',
        element: <FilmePage />,
      },
      {
        path: 'salas',
        element: <SalaPage />,
      },
      {
        path: 'sessoes',
        element: <SessaoPage />,
      },
      {
        path: 'ingressos',
        element: <IngressoPage />,
      },
      {
        path: 'lanches-combo',
        element: <LancheComboPage />,
      },
      {
        path: 'pedidos',
        element: <PedidoPage />,
      },
    ],
  },
]);