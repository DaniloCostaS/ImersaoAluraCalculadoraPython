import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/codeExamples';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults({});
  };

  const answeredCount = Object.keys(showResults).length;
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <section id="quiz" className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Desafio Prático</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Teste seu Conhecimento de Iniciante
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            4 perguntas rápidas para fixar como o Python lida com números, strings e condições.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-600 font-medium">
            Pontuação: <span className="font-bold text-slate-900">{correctCount}</span> de {QUIZ_QUESTIONS.length}
          </div>
          {answeredCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Quiz</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q: QuizQuestion, index: number) => {
          const selectedOption = userAnswers[q.id];
          const hasAnswered = showResults[q.id];
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div key={q.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-9">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let buttonStyle = 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/30';

                  if (hasAnswered) {
                    if (isThisCorrect) {
                      buttonStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                    } else if (isThisSelected && !isThisCorrect) {
                      buttonStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                    } else {
                      buttonStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs font-medium transition-all flex items-center justify-between gap-2 ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback */}
              {hasAnswered && (
                <div
                  className={`mt-2 ml-9 p-3 rounded-lg text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                >
                  <div className="font-semibold mb-0.5">
                    {isCorrect ? 'Correto!' : 'Ops, não exatamente:'}
                  </div>
                  <div>{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
