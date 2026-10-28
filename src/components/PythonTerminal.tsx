import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TerminalState {
  step: 'idle' | 'num1' | 'op' | 'num2' | 'result';
  num1Str: string;
  opStr: string;
  num2Str: string;
  resultStr: string | null;
  errorMessage: string | null;
  history: Array<{
    num1: number;
    op: string;
    num2: number;
    result: string;
    isError: boolean;
  }>;
}

const PRESETS = [
  { label: 'Soma: 15 + 7', n1: '15', op: '+', n2: '7' },
  { label: 'Subtração: 50.5 - 12.2', n1: '50.5', op: '-', n2: '12.2' },
  { label: 'Multiplicação: 8 * 9', n1: '8', op: '*', n2: '9' },
  { label: 'Divisão: 42 / 6', n1: '42', op: '/', n2: '6' },
  { label: 'Divisão por Zero: 10 / 0', n1: '10', op: '/', n2: '0' },
  { label: 'Operador Inválido: 9 ^ 2', n1: '9', op: '^', n2: '2' },
];

export const PythonTerminal: React.FC = () => {
  const [terminalState, setTerminalState] = useState<TerminalState>({
    step: 'idle',
    num1Str: '',
    opStr: '',
    num2Str: '',
    resultStr: null,
    errorMessage: null,
    history: [
      { num1: 20, op: '+', num2: 4, result: '24.0', isError: false },
      { num1: 100, op: '/', num2: 5, result: '20.0', isError: false }
    ],
  });

  const [currentInput, setCurrentInput] = useState('');

  const startNewCalculation = () => {
    setTerminalState((prev) => ({
      ...prev,
      step: 'num1',
      num1Str: '',
      opStr: '',
      num2Str: '',
      resultStr: null,
      errorMessage: null,
    }));
    setCurrentInput('');
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    const n1 = parseFloat(preset.n1);
    const n2 = parseFloat(preset.n2);
    let result = '';
    let isErr = false;

    if (preset.op === '+') {
      result = (n1 + n2).toString();
    } else if (preset.op === '-') {
      result = (n1 - n2).toString();
    } else if (preset.op === '*') {
      result = (n1 * n2).toString();
    } else if (preset.op === '/') {
      if (n2 === 0) {
        result = 'Erro: Não é possível dividir por zero!';
        isErr = true;
      } else {
        result = (n1 / n2).toString();
      }
    } else {
      result = 'Operação inválida! Por favor, use apenas +, -, * ou /.';
      isErr = true;
    }

    setTerminalState((prev) => ({
      ...prev,
      step: 'result',
      num1Str: preset.n1,
      opStr: preset.op,
      num2Str: preset.n2,
      resultStr: result,
      errorMessage: isErr ? result : null,
      history: [
        {
          num1: isNaN(n1) ? 0 : n1,
          op: preset.op,
          num2: isNaN(n2) ? 0 : n2,
          result: isErr ? result : `${preset.n1} ${preset.op} ${preset.n2} = ${result}`,
          isError: isErr,
        },
        ...prev.history.slice(0, 4),
      ],
    }));
    setCurrentInput('');
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = currentInput.trim();

    if (terminalState.step === 'num1') {
      if (!val || isNaN(Number(val))) {
        setTerminalState((prev) => ({
          ...prev,
          errorMessage: 'ValueError: poderia não ser um número válido. Tente digitar por exemplo 10 ou 4.5.',
        }));
        return;
      }
      setTerminalState((prev) => ({
        ...prev,
        step: 'op',
        num1Str: val,
        errorMessage: null,
      }));
      setCurrentInput('');
    } else if (terminalState.step === 'op') {
      if (!['+', '-', '*', '/'].includes(val)) {
        // We let the user type invalid operators too so they can see the else branch!
      }
      setTerminalState((prev) => ({
        ...prev,
        step: 'num2',
        opStr: val,
        errorMessage: null,
      }));
      setCurrentInput('');
    } else if (terminalState.step === 'num2') {
      if (!val || isNaN(Number(val))) {
        setTerminalState((prev) => ({
          ...prev,
          errorMessage: 'ValueError: digite um número válido para o segundo valor.',
        }));
        return;
      }

      const n1 = parseFloat(terminalState.num1Str);
      const n2 = parseFloat(val);
      const op = terminalState.opStr;

      let res = '';
      let isErr = false;

      if (op === '+') {
        res = (n1 + n2).toString();
      } else if (op === '-') {
        res = (n1 - n2).toString();
      } else if (op === '*') {
        res = (n1 * n2).toString();
      } else if (op === '/') {
        if (n2 === 0) {
          res = 'Erro: Não é possível dividir por zero!';
          isErr = true;
        } else {
          res = (n1 / n2).toString();
        }
      } else {
        res = 'Operação inválida! Por favor, use apenas +, -, * ou /.';
        isErr = true;
      }

      setTerminalState((prev) => ({
        ...prev,
        step: 'result',
        num2Str: val,
        resultStr: res,
        errorMessage: isErr ? res : null,
        history: [
          {
            num1: n1,
            op,
            num2: n2,
            result: isErr ? res : `${n1} ${op} ${n2} = ${res}`,
            isError: isErr,
          },
          ...prev.history.slice(0, 4),
        ],
      }));
      setCurrentInput('');
    }
  };

  const getBranchHighlighted = () => {
    if (terminalState.step !== 'result') return null;
    const op = terminalState.opStr;
    const n2 = parseFloat(terminalState.num2Str);

    if (op === '+') return 'if operacao == "+": resultado = num1 + num2';
    if (op === '-') return 'elif operacao == "-": resultado = num1 - num2';
    if (op === '*') return 'elif operacao == "*": resultado = num1 * num2';
    if (op === '/') {
      if (n2 === 0) return 'elif operacao == "/": -> else: print("Erro: Divisão por zero!")';
      return 'elif operacao == "/": -> if num2 != 0: resultado = num1 / num2';
    }
    return 'else: print("Operação inválida!")';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 text-slate-300 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-xs text-slate-400">terminal — python3 calculadora.py</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startNewCalculation}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
            title="Reiniciar execução do script"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Executar Novamente</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="bg-slate-950 text-slate-100 p-5 font-mono text-sm min-h-[300px] flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="text-slate-500 text-xs">
            $ python3 calculadora.py
          </div>
          <div className="text-emerald-400 font-semibold">
            --- CALCULADORA SIMPLES ---
          </div>

          {/* Step 1: num1 */}
          {terminalState.step !== 'idle' && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sky-300">Digite o primeiro número: </span>
              {terminalState.step === 'num1' ? (
                <form onSubmit={handleStepSubmit} className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    autoFocus
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="Ex: 10"
                    className="bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-sm w-28 focus:outline-hidden focus:border-sky-400"
                  />
                  <button
                    type="submit"
                    className="px-2 py-0.5 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded transition-colors"
                  >
                    Enter
                  </button>
                </form>
              ) : (
                <span className="text-amber-300 font-semibold">{terminalState.num1Str}</span>
              )}
            </div>
          )}

          {/* Step 2: op */}
          {['op', 'num2', 'result'].includes(terminalState.step) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sky-300">Digite a operação (+, -, *, /): </span>
              {terminalState.step === 'op' ? (
                <form onSubmit={handleStepSubmit} className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    autoFocus
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="+ ou - ou * ou /"
                    className="bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-sm w-20 focus:outline-hidden focus:border-sky-400 text-center"
                  />
                  <div className="flex items-center gap-1">
                    {['+', '-', '*', '/'].map((op) => (
                      <button
                        key={op}
                        type="button"
                        onClick={() => {
                          setTerminalState((p) => ({ ...p, step: 'num2', opStr: op, errorMessage: null }));
                          setCurrentInput('');
                        }}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded border border-slate-700"
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="px-2 py-0.5 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded transition-colors"
                  >
                    Enter
                  </button>
                </form>
              ) : (
                <span className="text-amber-300 font-semibold">{terminalState.opStr}</span>
              )}
            </div>
          )}

          {/* Step 3: num2 */}
          {['num2', 'result'].includes(terminalState.step) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sky-300">Digite o segundo número: </span>
              {terminalState.step === 'num2' ? (
                <form onSubmit={handleStepSubmit} className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    autoFocus
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="Ex: 5"
                    className="bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-sm w-28 focus:outline-hidden focus:border-sky-400"
                  />
                  <button
                    type="submit"
                    className="px-2 py-0.5 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded transition-colors"
                  >
                    Enter
                  </button>
                </form>
              ) : (
                <span className="text-amber-300 font-semibold">{terminalState.num2Str}</span>
              )}
            </div>
          )}

          {/* Step 4: Result Output */}
          {terminalState.step === 'result' && (
            <div className="pt-2 border-t border-slate-800/80 space-y-1">
              {terminalState.errorMessage ? (
                <div className="text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{terminalState.errorMessage}</span>
                </div>
              ) : (
                <div className="text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Resultado: {terminalState.num1Str} {terminalState.opStr} {terminalState.num2Str} = {terminalState.resultStr}
                  </span>
                </div>
              )}
              <div className="text-slate-500 text-xs pt-1">
                Processo finalizado com código de saída 0.
              </div>
            </div>
          )}

          {/* Idle prompt if not started */}
          {terminalState.step === 'idle' && (
            <div className="py-6 text-center space-y-3">
              <p className="text-slate-400 text-xs">
                Clique abaixo ou selecione um teste rápido para iniciar a simulação passo a passo:
              </p>
              <button
                onClick={startNewCalculation}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Iniciar Execução Interativa</span>
              </button>
            </div>
          )}

          {/* Validation warning */}
          {terminalState.errorMessage && terminalState.step !== 'result' && (
            <div className="text-rose-400 text-xs flex items-center gap-1.5 mt-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{terminalState.errorMessage}</span>
            </div>
          )}
        </div>

        {/* Input instructions or hint */}
        <div className="pt-4 text-xs text-slate-500 border-t border-slate-900 flex items-center justify-between">
          <span>Python 3.12 (Simulador Interativo)</span>
          <span className="text-slate-400">
            {terminalState.step === 'idle' && 'Pronto para executar'}
            {terminalState.step === 'num1' && 'Aguardando 1º número...'}
            {terminalState.step === 'op' && 'Aguardando operação (+, -, *, /)...'}
            {terminalState.step === 'num2' && 'Aguardando 2º número...'}
            {terminalState.step === 'result' && 'Execução concluída'}
          </span>
        </div>
      </div>

      {/* Preset Quick Tests Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-700">
            Cenários Rápidos de Teste (1-Clique):
          </span>
          <span className="text-xs text-slate-500">
            Teste diferentes caminhos do código
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 rounded-lg text-xs font-medium text-slate-700 transition-all text-left shadow-2xs group"
            >
              <div className="text-[11px] text-slate-500 group-hover:text-sky-700">
                {p.label.split(':')[0]}
              </div>
              <div className="font-mono text-xs font-semibold text-slate-900">
                {p.label.split(':')[1]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Variable Memory Inspector (Educational Visualizer) */}
      <div className="px-5 py-4 bg-white border-t border-slate-200">
        <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span>Inspetor de Memória (Variáveis no Python):</span>
          {terminalState.step === 'result' && (
            <span className="text-xs text-emerald-700 font-mono">
              Status: Cálculo finalizado
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 text-[11px] font-sans">Variável: num1 (float)</div>
            <div className="text-slate-900 font-bold truncate">
              {terminalState.num1Str ? `${terminalState.num1Str}` : '<aguardando>'}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 text-[11px] font-sans">Variável: operacao (str)</div>
            <div className="text-slate-900 font-bold truncate">
              {terminalState.opStr ? `"${terminalState.opStr}"` : '<aguardando>'}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 text-[11px] font-sans">Variável: num2 (float)</div>
            <div className="text-slate-900 font-bold truncate">
              {terminalState.num2Str ? `${terminalState.num2Str}` : '<aguardando>'}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 text-[11px] font-sans">Variável: resultado</div>
            <div className={`font-bold truncate ${terminalState.errorMessage ? 'text-rose-600' : 'text-emerald-600'}`}>
              {terminalState.resultStr ? terminalState.resultStr : '<não definido>'}
            </div>
          </div>
        </div>

        {/* Live Branch Inspector */}
        {getBranchHighlighted() && (
          <div className="mt-3 p-2.5 bg-sky-50/70 border border-sky-200 rounded-lg text-xs flex items-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-sky-700 shrink-0" />
            <span className="text-slate-600">Ramo condicional executado:</span>
            <code className="font-mono text-sky-900 font-semibold">
              {getBranchHighlighted()}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};
