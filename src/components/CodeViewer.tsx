import React, { useState } from 'react';
import { Copy, Check, Download, Info, Code2 } from 'lucide-react';
import { CODE_VERSIONS, CodeVersion } from '../data/codeExamples';

interface CodeViewerProps {
  onDownloadScript: (versionId: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onDownloadScript }) => {
  const [selectedVersionKey, setSelectedVersionKey] = useState<string>('basico');
  const [copied, setCopied] = useState(false);
  const [selectedLine, setSelectedLine] = useState<number | null>(9);

  const currentVersion: CodeVersion = CODE_VERSIONS[selectedVersionKey] || CODE_VERSIONS.basico;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentVersion.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Syntax highlighter for Python
  const formatPythonLine = (line: string) => {
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    // Replace keywords and patterns safely
    const tokens = line.split(/(\b(?:def|return|if|elif|else|while|try|except|break|True|False|float|input|print|strip|lower)\b|"[^"]*"|'[^']*'|[0-9]+(?:\.[0-9]+)?|[+\-*\/=<>!]+)/g);

    return tokens.map((token, index) => {
      if (['def', 'return', 'if', 'elif', 'else', 'while', 'try', 'except', 'break'].includes(token)) {
        return <span key={index} className="text-rose-400 font-semibold">{token}</span>;
      }
      if (['float', 'input', 'print', 'strip', 'lower'].includes(token)) {
        return <span key={index} className="text-sky-300 font-semibold">{token}</span>;
      }
      if (['True', 'False'].includes(token)) {
        return <span key={index} className="text-amber-400 font-semibold">{token}</span>;
      }
      if (token.startsWith('"') || token.startsWith("'")) {
        return <span key={index} className="text-emerald-300">{token}</span>;
      }
      if (/^[0-9]+(\.[0-9]+)?$/.test(token)) {
        return <span key={index} className="text-amber-300">{token}</span>;
      }
      if (['+', '-', '*', '/', '%', '==', '!=', '=', '<', '>'].includes(token)) {
        return <span key={index} className="text-purple-300">{token}</span>;
      }
      return <span key={index} className="text-slate-200">{token}</span>;
    });
  };

  const lines = currentVersion.code.split('\n');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Controls: Tabs and Actions */}
      <div className="border-b border-slate-200 p-4 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Interactive Filter Tabs / Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => {
              setSelectedVersionKey('basico');
              setSelectedLine(9);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedVersionKey === 'basico'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Básica (Iniciante)
          </button>

          <button
            onClick={() => {
              setSelectedVersionKey('funcoes');
              setSelectedLine(6);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedVersionKey === 'funcoes'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Com Funções (def)
          </button>

          <button
            onClick={() => {
              setSelectedVersionKey('completo');
              setSelectedLine(8);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedVersionKey === 'completo'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Completa (while + try)
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            title="Copiar código Python para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={() => onDownloadScript(selectedVersionKey)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            title="Baixar este arquivo Python no seu computador"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Version summary text */}
      <div className="px-5 py-3 border-b border-slate-200 bg-white">
        <h3 className="text-sm font-semibold text-slate-900">{currentVersion.title}</h3>
        <p className="text-xs text-slate-600 mt-0.5">{currentVersion.description}</p>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 p-4 font-mono text-xs sm:text-sm overflow-x-auto max-h-[500px] overflow-y-auto">
        <div className="min-w-fit">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const hasExplanation = Boolean(currentVersion.lineExplanations[lineNum]);
            const isSelected = selectedLine === lineNum;

            return (
              <div
                key={idx}
                onClick={() => hasExplanation && setSelectedLine(lineNum)}
                className={`flex items-start gap-4 px-2 py-0.5 rounded transition-colors ${
                  isSelected
                    ? 'bg-sky-950/80 border-l-2 border-sky-400'
                    : hasExplanation
                    ? 'hover:bg-slate-900/90 cursor-pointer'
                    : ''
                }`}
              >
                {/* Line number */}
                <span className="w-8 text-right text-slate-600 select-none shrink-0 font-mono text-xs pt-0.5">
                  {lineNum}
                </span>

                {/* Code content */}
                <span className="whitespace-pre flex-1">
                  {formatPythonLine(line)}
                </span>

                {/* Has explanation indicator */}
                {hasExplanation && (
                  <span
                    className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-sans transition-opacity ${
                      isSelected
                        ? 'bg-sky-800 text-sky-200'
                        : 'text-slate-500 hover:text-sky-300'
                    }`}
                    title="Clique para ver a explicação desta linha"
                  >
                    Explicar
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Line Breakdown Panel */}
      {selectedLine && currentVersion.lineExplanations[selectedLine] && (
        <div className="p-4 bg-sky-50/70 border-t border-sky-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-900">
              <span>Explicação didática da Linha {selectedLine}:</span>
              <code className="text-sky-800 bg-sky-100/70 px-1.5 py-0.5 rounded text-[11px] font-mono">
                {lines[selectedLine - 1]?.trim()}
              </code>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentVersion.lineExplanations[selectedLine]}
            </p>
          </div>
        </div>
      )}

      {/* Footer guidance */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Dica: Clique nas linhas marcadas com &quot;Explicar&quot; para ler o significado didático.</span>
        </div>
        <span>Indentação: 4 espaços (Padrão PEP 8)</span>
      </div>
    </div>
  );
};
