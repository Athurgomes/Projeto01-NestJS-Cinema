import React from 'react';
import { NavLink } from 'react-router-dom';

// Lista de todas as entidades baseadas no seu backend
const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Gêneros', path: '/generos' },
  { name: 'Filmes', path: '/filmes' },
  { name: 'Salas', path: '/salas' },
  { name: 'Sessões', path: '/sessoes' },
  { name: 'Ingressos', path: '/ingressos' },
  { name: 'Lanches & Combos', path: '/lanches-combo' },
  { name: 'Pedidos', path: '/pedidos' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col h-full z-10 shadow-lg">
      {/* Logotipo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <h1 className="text-xl font-bold text-accent tracking-wider">
          CINE<span className="text-text-main font-light">FLIX</span>
        </h1>
      </div>
      
      {/* Links de Navegação */}
      <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-3 ${
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20' // Estilo quando a página está aberta
                  : 'text-text-muted hover:bg-elevated hover:text-text-main border border-transparent'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Rodapé da Sidebar */}
      <div className="p-4 border-t border-border text-center">
        <p className="text-xs text-text-muted">© 2026 CineFlix Pro</p>
      </div>
    </aside>
  );
};