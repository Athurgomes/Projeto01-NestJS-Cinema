import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
      <div className="text-text-muted text-sm font-medium">
        <span>Sistema de Gestão de Cinema</span>
      </div>
      
      {/* Mockup de um perfil de utilizador logado */}
      <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
        <div className="text-right">
          <p className="text-sm font-medium text-text-main">Administrador</p>
          <p className="text-xs text-text-muted">admin@cineflix.pt</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow-md">
          A
        </div>
      </div>
    </header>
  );
};