import React from 'react';
import { Download } from 'lucide-react';
import { CODE_VERSIONS } from '../data/codeExamples';

interface NavbarProps {
  onDownloadScript: (versionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDownloadScript }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, single line */}
        <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
          <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-mono text-base font-semibold shadow-xs">
            py
          </span>
          <span>Calculadora Python</span>
        </a>

        {/* Zone 2: 4 nav links, single line */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#simulador" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Simulador
          </a>
          <a href="#codigo" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Código Fonte
          </a>
          <a href="#conceitos" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Conceitos Chave
          </a>
          <a href="#quiz" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Quiz do Iniciante
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onDownloadScript('basico')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs active:scale-98 whitespace-nowrap shrink-0"
            title="Baixar arquivo calculadora.py pronto para rodar no seu computador"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
