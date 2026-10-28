import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, Terminal, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { CONCEPT_GUIDES, ConceptGuide } from '../data/codeExamples';

export const ConceptCards: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>('input-float');

  const handleCopySnippet = (id: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'input-float':
        return <Terminal className="w-4 h-4 text-sky-600" />;
      case 'operators':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'zero-division':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <section id="conceitos" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Componentes Fundamentais Explicados
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Entenda por trás dos panos o que cada função e palavra-chave do Python faz nesta calculadora.
          </p>
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap">
          5 conceitos essenciais · Guia para iniciantes
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONCEPT_GUIDES.map((concept: ConceptGuide) => {
          const isExpanded = expandedId === concept.id;

          return (
            <div
              key={concept.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with unboxed metadata */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    {getCategoryIcon(concept.id)}
                    <span>{concept.badge}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Python 3</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {concept.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {concept.summary}
                </p>

                {/* Code Snippet Box */}
                <div className="relative bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-200 mb-4 overflow-x-auto border border-slate-800">
                  <button
                    onClick={() => handleCopySnippet(concept.id, concept.codeSnippet)}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Copiar snippet de código"
                  >
                    {copiedId === concept.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <pre className="pr-8">{concept.codeSnippet}</pre>
                </div>
              </div>

              {/* Expandable Deep Dive */}
              <div className="border-t border-slate-100 pt-3 mt-1">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                  className="w-full flex items-center justify-between text-xs font-medium text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <span>{isExpanded ? 'Ocultar detalhes & erros comuns' : 'Ver por que isso importa & erro comum'}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2.5 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="font-semibold text-slate-800">Por que é crucial: </span>
                      <span className="text-slate-600">{concept.whyItMatters}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-rose-700">Erro clássico de iniciante: </span>
                      <span className="text-slate-600">{concept.commonMistake}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
