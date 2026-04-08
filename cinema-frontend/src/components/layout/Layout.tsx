import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-primary text-text-main">
      {/* Menu Lateral Fixo */}
      <Sidebar />
      
      {/* Área Principal (Header + Conteúdo Dinâmico) */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header />
        
        {/* Aqui é onde as páginas (Filmes, Sessões, etc) vão aparecer */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};