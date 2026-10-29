/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { PythonTerminal } from './components/PythonTerminal';
import { CodeViewer } from './components/CodeViewer';
import { ConceptCards } from './components/ConceptCards';
import { QuizSection } from './components/QuizSection';
import { CODE_VERSIONS } from './data/codeExamples';
import { Terminal, BookOpen, CheckCircle, ArrowDown, Laptop } from 'lucide-react';

export default function App() {
  const handleDownloadScript = (versionId: string = 'basico') => {
    const targetVersion = CODE_VERSIONS[versionId] || CODE_VERSIONS.basico;
    const blob = new Blob([targetVersion.code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calculadora_${targetVersion.id}.py`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Bar Contract compliant Navigation */}
      <Navbar onDownloadScript={handleDownloadScript} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Guia Passo a Passo</span>
            <span aria-hidden="true">·</span>
            <span>Python 3 para Iniciantes</span>
            <span aria-hidden="true">·</span>
            <span>Operações Aritméticas & Porcentagem (+, -, *, /, %)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl" style={{ textWrap: 'balance' }}>
            Como Criar uma Calculadora Simples em Python
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Seja bem-vindo ao mundo da programação! Construir uma calculadora é um dos melhores projetos para começar: você vai aprender a receber dados do usuário, converter tipos numéricos, realizar cálculos matemáticos e tomar decisões com condições <code className="text-xs bg-slate-200/80 px-1.5 py-0.5 rounded font-mono">if/elif/else</code>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#simulador"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <Terminal className="w-4 h-4" />
              <span>Experimentar no Simulador</span>
            </a>

            <a
              href="#codigo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Ver Código Fonte Comentado</span>
            </a>
          </div>
        </section>

        {/* Two-Zone Interactive Sandbox: Terminal & Code Viewer */}
        <section id="simulador" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                1. Laboratório & Simulador de Execução
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Execute a calculadora diretamente no navegador ou teste situações como a divisão por zero.
              </p>
            </div>
            <div className="text-xs text-slate-500">
              Terminal interativo · Inspetor de memória ao vivo
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Interactive Terminal (Left Zone - 6 Cols) */}
            <div className="lg:col-span-6 space-y-3">
              <PythonTerminal />
            </div>

            {/* Code Viewer (Right Zone - 6 Cols) */}
            <div id="codigo" className="lg:col-span-6 space-y-3">
              <CodeViewer onDownloadScript={handleDownloadScript} />
            </div>
          </div>
        </section>

        {/* Core Concepts Deep Dive */}
        <ConceptCards />

        {/* Step-by-Step Computer Setup Guide */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
              <Laptop className="w-4 h-4" />
              <span>Guia de Execução Local</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Como Rodar Esse Código no Seu Computador
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Passos simples para testar o arquivo Python no Windows, macOS ou Linux.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Tenha o Python Instalado</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acesse o site oficial <strong className="text-slate-800">python.org</strong> e baixe a versão mais recente. No Windows, lembre-se de marcar a opção <em className="text-slate-800">&quot;Add Python to PATH&quot;</em> durante a instalação.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Salve o Arquivo .py</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clique no botão <strong className="text-slate-800">&quot;Baixar .py&quot;</strong> acima ou crie um arquivo chamado <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono">calculadora.py</code> no VS Code, Notepad ou PyCharm e cole o código.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Execute no Terminal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Abra o terminal na pasta do arquivo e digite:
                <br />
                <code className="inline-block mt-1 bg-slate-950 text-slate-100 px-2 py-1 rounded font-mono text-[11px]">
                  python calculadora.py
                </code>
              </p>
            </div>
          </div>
        </section>

        {/* Practical Quiz */}
        <QuizSection />
      </main>

      {/* Quiet, Clean Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Calculadora Python para Iniciantes</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Material didático livre para estudos e aprendizado</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#simulador" className="hover:text-slate-900 transition-colors">
              Simulador
            </a>
            <a href="#codigo" className="hover:text-slate-900 transition-colors">
              Código
            </a>
            <a href="#conceitos" className="hover:text-slate-900 transition-colors">
              Conceitos
            </a>
            <a href="#quiz" className="hover:text-slate-900 transition-colors">
              Quiz
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
