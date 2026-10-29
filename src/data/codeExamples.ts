export interface CodeVersion {
  id: 'basico' | 'funcoes' | 'completo';
  title: string;
  subtitle: string;
  description: string;
  code: string;
  lineExplanations: Record<number, string>;
}

export const CODE_VERSIONS: Record<string, CodeVersion> = {
  basico: {
    id: 'basico',
    title: '1. Versão Básica (Iniciante)',
    subtitle: 'Direta e sequencial',
    description: 'Perfeita para quem acabou de começar. Suporta as 4 operações básicas (+, -, *, /) e cálculo de porcentagem (%).',
    code: `# ===================================================
# CALCULADORA EM PYTHON - OPERAÇÕES BÁSICAS & PORCENTAGEM
# ===================================================

# 1. Apresentação do programa
print("--- CALCULADORA SIMPLES ---")

# 2. Entrada do primeiro número (valor base)
num1 = float(input("Digite o primeiro número: "))

# 3. Escolha da operação matemática (+, -, *, /, %)
operacao = input("Digite a operação (+, -, *, /, %): ").strip()

# 4. Entrada do segundo número
if operacao == "%":
    num2 = float(input("Digite a porcentagem desejada (%): "))
else:
    num2 = float(input("Digite o segundo número: "))

# 5. Estrutura condicional para calcular a operação
if operacao == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Tratamento especial: divisão por zero não é permitida!
    if num2 != 0:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
    else:
        print("Erro: Não é possível dividir por zero!")

elif operacao == "%":
    # Porcentagem: num2% de num1 -> (num1 * num2) / 100
    resultado = (num1 * num2) / 100
    print(f"Resultado: {num2}% de {num1} = {resultado}")

else:
    print("Operação inválida! Por favor, use +, -, *, / ou %.")
`,
    lineExplanations: {
      6: 'A função print() exibe um texto na tela para saudar o usuário.',
      9: 'input() captura o que o usuário digita no teclado como texto (string). float() converte esse texto para um número com casas decimais.',
      12: 'Guarda o caractere da operação matemática (+, -, *, /, %) na variável "operacao".',
      15: 'Se o usuário escolheu porcentagem (%), solicitamos explicitamente a taxa percentual.',
      21: 'if verifica se a operação escolhida foi soma "+". Em Python usamos == para comparar igualdade.',
      22: 'Soma os dois valores e guarda o total na variável "resultado".',
      25: 'elif significa "senão se". Só é testado se o if anterior foi falso.',
      33: 'Testa a divisão com a barra (/), checando se num2 != 0 para prevenir o erro ZeroDivisionError.',
      42: 'A nova operação: calcula num2% de num1 usando a fórmula matemática (num1 * num2) / 100.',
      43: 'Guarda o resultado da porcentagem calculada.',
      46: 'else ("senão"): executa caso o usuário tenha digitado um símbolo que não seja nenhum dos 5 permitidos.'
    }
  },

  funcoes: {
    id: 'funcoes',
    title: '2. Versão com Funções (def)',
    subtitle: 'Modular e reutilizável',
    description: 'Ensina a criar funções em Python. Cada operação (incluindo porcentagem) possui sua própria função reutilizável.',
    code: `# ===================================================
# CALCULADORA COM FUNÇÕES (DEF) + PORCENTAGEM
# ===================================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

def calcular_porcentagem(base, taxa):
    """Calcula taxa% do valor base. Exemplo: 15% de 200 = 30"""
    return (base * taxa) / 100

def calculadora():
    print("--- CALCULADORA COM FUNÇÕES ---")
    
    n1 = float(input("Digite o 1º número: "))
    op = input("Operação (+, -, *, /, %): ").strip()
    
    if op == "%":
        n2 = float(input("Digite a porcentagem (%): "))
    else:
        n2 = float(input("Digite o 2º número: "))
    
    if op == "+":
        res = somar(n1, n2)
    elif op == "-":
        res = subtrair(n1, n2)
    elif op == "*":
        res = multiplicar(n1, n2)
    elif op == "/":
        res = dividir(n1, n2)
    elif op == "%":
        res = calcular_porcentagem(n1, n2)
    else:
        res = "Operação inválida!"
        
    print(f"Resultado: {res}")

# Inicia o programa chamando a função principal
calculadora()
`,
    lineExplanations: {
      5: 'A palavra-chave "def" cria uma nova função personalizada chamada "somar" que recebe dois parâmetros: a e b.',
      18: 'A nova função calcular_porcentagem recebe o valor base e a taxa percentual.',
      19: 'Aplica a fórmula matemática (base * taxa) / 100 e devolve o valor com return.',
      39: 'Chama a função de porcentagem passando n1 e n2 caso o operador seja "%".'
    }
  },

  completo: {
    id: 'completo',
    title: '3. Versão Completa (Loop e Validação)',
    subtitle: 'Com while e try/except',
    description: 'Versão robusta completa: suporta +, -, *, /, %, repetição contínua com while e tratamento de erros de digitação.',
    code: `# ===================================================
# CALCULADORA COMPLETA COM LOOP, TRY/EXCEPT & PORCENTAGEM
# ===================================================

def obter_numero(mensagem):
    """Garante que o usuário digite um número válido sem quebrar o programa."""
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("Entrada inválida! Digite apenas números.")

print("Bem-vindo à Calculadora Completa!")

while True:
    n1 = obter_numero("Digite o primeiro número (ou valor base): ")
    print("Operações: [+] Soma  [-] Subtração  [*] Multiplicação  [/] Divisão  [%] Porcentagem")
    op = input("Escolha a operação: ").strip()
    
    if op == "%":
        n2 = obter_numero("Digite a porcentagem desejada (%): ")
    else:
        n2 = obter_numero("Digite o segundo número: ")
    
    # Realização do cálculo
    if op == "+":
        print(f"-> {n1} + {n2} = {n1 + n2}")
    elif op == "-":
        print(f"-> {n1} - {n2} = {n1 - n2}")
    elif op == "*":
        print(f"-> {n1} * {n2} = {n1 * n2}")
    elif op == "/":
        if n2 != 0:
            print(f"-> {n1} / {n2} = {n1 / n2}")
        else:
            print("-> Erro: Impossível dividir por zero!")
    elif op == "%":
        resultado_pct = (n1 * n2) / 100
        print(f"-> {n2}% de {n1} = {resultado_pct}")
    else:
        print("-> Operação não reconhecida!")
        
    continuar = input("\\nDeseja fazer outro cálculo? (s/n): ").strip().lower()
    if continuar != 's':
        print("Obrigado por usar a calculadora. Até logo!")
        break
`,
    lineExplanations: {
      5: 'Função utilitária com docstring para validação de entrada numérica.',
      20: 'Se a operação for porcentagem, o prompt fica mais claro pedindo a porcentagem.',
      33: 'Calcula a porcentagem e exibe o valor formatado amigavelmente.',
      40: 'Permite ao usuário decidir se quer continuar calculando ou sair com break.'
    }
  }
};

export interface ConceptGuide {
  id: string;
  title: string;
  codeSnippet: string;
  badge: string;
  summary: string;
  whyItMatters: string;
  commonMistake: string;
}

export const CONCEPT_GUIDES: ConceptGuide[] = [
  {
    id: 'percentage',
    title: '1. Nova Operação: Porcentagem (%)',
    codeSnippet: `# Calcular 15% de 200:
base = 200.0
taxa = 15.0
resultado = (base * taxa) / 100  # Resultado: 30.0`,
    badge: 'Nova Funcionalidade',
    summary: 'A matemática da porcentagem consiste em multiplicar o valor base pela taxa e dividir por 100. Na nossa calculadora, ao escolher %, o usuário informa a base (ex: 200) e a taxa (ex: 15%), resultando em 30.0.',
    whyItMatters: 'Porcentagem é uma das operações mais solicitadas em finanças, descontos e métricas do mundo real.',
    commonMistake: 'Confundir com o operador de resto (%) nativo do Python! Em código puro, 10 % 3 calcula o resto da divisão inteira (1). Já na nossa calculadora, tratamos a string "%" como o cálculo matemático de porcentagem.'
  },
  {
    id: 'input-float',
    title: '2. Entrada de Dados: input() e float()',
    codeSnippet: 'num1 = float(input("Digite um número: "))',
    badge: 'Entrada & Tipagem',
    summary: 'A função input() sempre lê os dados digitados como texto (string). Se você somar "5" + "5", o Python vai juntar os textos resultando em "55" em vez de 10. Por isso, envolvemos com float() para converter em número decimal.',
    whyItMatters: 'Sem conversão de tipo, computadores tratam números como sequências de caracteres alfabéticos.',
    commonMistake: 'Esquecer o float() ou int(): num = input("Valor: ") gera TypeError quando você tenta subtrair ou dividir.'
  },
  {
    id: 'operators',
    title: '3. Os 5 Operadores da Calculadora',
    codeSnippet: `soma = 10 + 5          # 15.0
subtracao = 10 - 5     # 5.0
multi = 10 * 5         # 50.0
divisao = 10 / 5       # 2.0
porcentagem = (200 * 15) / 100  # 30.0`,
    badge: 'Aritmética',
    summary: 'Suportamos + (adição), - (subtração), * (multiplicação), / (divisão) e % (porcentagem). Todas as operações anteriores continuam funcionando de forma isolada e consistente.',
    whyItMatters: 'A modularidade garante que adicionar novas operações nunca quebre as existentes (Princípio Aberto/Fechado).',
    commonMistake: 'Alterar a ordem dos ramos if/elif de modo que um operador intercepte incorretamente outro.'
  },
  {
    id: 'conditionals',
    title: '4. Tomada de Decisão: if, elif e else',
    codeSnippet: `if operacao == "+":
    resultado = n1 + n2
elif operacao == "%":
    resultado = (n1 * n2) / 100
else:
    print("Opção inválida")`,
    badge: 'Fluxo Condicional',
    summary: 'Adicionar a porcentagem foi simples graças à estrutura encadeada de elif: adicionamos um novo bloco específico elif operacao == "%": sem mexer no comportamento de +, -, * ou /.',
    whyItMatters: 'Permite que seu código se expanda para novas funções facilmente sem riscos de regressão.',
    commonMistake: 'Esquecer de atualizar a validação de símbolos válidos na mensagem do else final.'
  },
  {
    id: 'zero-division',
    title: '5. Cuidados com a Divisão por Zero',
    codeSnippet: `if num2 != 0:
    resultado = num1 / num2
else:
    print("Não é possível dividir por zero!")`,
    badge: 'Prevenção de Erros',
    summary: 'Mesmo com a nova operação de porcentagem, a proteção contra divisão por zero continua ativa e validada nos testes unitários automatizados.',
    whyItMatters: 'Garante confiabilidade e evita que o programa trave de forma abrupta.',
    commonMistake: 'Dividir diretamente sem checar se num2 == 0.'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Para calcular 20% de 150 em Python, qual expressão matemática está correta?',
    options: ['(150 * 20) / 100', '150 % 20', '150 + 20 / 100', '150 * 0.02'],
    correctIndex: 0,
    explanation: 'Correto! 20% é o mesmo que 20/100 (ou 0.2). Multiplicando 150 * 20 e dividindo por 100, obtemos 30.0.'
  },
  {
    id: 2,
    question: 'Qual é a diferença entre o símbolo "%" na matemática da calculadora e o "%" nativo do código Python?',
    options: [
      'Não há diferença',
      'No Python puro, % calcula o resto da divisão; na nossa calculadora, tratamos como cálculo de porcentagem',
      'No Python puro, % só serve para imprimir texto',
      'O Python não aceita o caractere %'
    ],
    correctIndex: 1,
    explanation: 'Exatamente! No Python puro (ex: 10 % 3), o operador calcula o resto (módulo). Na interface da nossa calculadora, usamos o símbolo "%" para que o usuário calcule porcentagens de forma intuitiva!'
  },
  {
    id: 3,
    question: 'Por que o uso de "elif" garante que adicionar a porcentagem não quebrou a soma (+), subtração (-), multiplicação (*) e divisão (/)?',
    options: [
      'Porque cada condição elif é avaliada de forma independente e exclusiva',
      'Porque o elif apaga as outras operações',
      'Porque o elif obriga a converter números em texto',
      'Porque o elif só aceita porcentagem'
    ],
    correctIndex: 0,
    explanation: 'Em uma cadeia if/elif/else, apenas o bloco cuja condição for verdadeira será executado. Cada operação está isolada em seu próprio bloco, garantindo que não haja interferência mútua.'
  },
  {
    id: 4,
    question: 'O que acontece no Python ao tentar executar a operação 15 / 0 sem tratamento?',
    options: [
      'Retorna o valor infinito (inf)',
      'Retorna o número 0',
      'O Python trava com o erro ZeroDivisionError',
      'O Python arredonda para 15'
    ],
    correctIndex: 2,
    explanation: 'A divisão por zero não é permitida matematicamente. O Python lança uma exceção ZeroDivisionError e interrompe o programa se não houver um "if" ou "try/except".'
  }
];
