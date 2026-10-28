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
    description: 'Perfeita para quem acabou de começar a programar. Usa apenas variáveis, input(), float(), if/elif/else e print().',
    code: `# ===================================================
# CALCULADORA SIMPLES EM PYTHON - VERSÃO BÁSICA
# ===================================================

# 1. Apresentação do programa
print("--- CALCULADORA SIMPLES ---")

# 2. Entrada do primeiro número (convertido para número decimal com float)
num1 = float(input("Digite o primeiro número: "))

# 3. Escolha da operação matemática
operacao = input("Digite a operação (+, -, *, /): ")

# 4. Entrada do segundo número
num2 = float(input("Digite o segundo número: "))

# 5. Estrutura condicional para decidir qual operação calcular
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
    # Tratamento especial: nunca podemos dividir por zero!
    if num2 != 0:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
    else:
        print("Erro: Não é possível dividir por zero!")

else:
    print("Operação inválida! Por favor, use apenas +, -, * ou /.")
`,
    lineExplanations: {
      6: 'A função print() exibe um texto na tela para saudar o usuário.',
      9: 'input() captura o que o usuário digita no teclado como texto (string). float() converte esse texto para um número com casas decimais.',
      12: 'Guarda o caractere da operação matemática (+, -, * ou /) na variável "operacao".',
      15: 'Captura o segundo número do usuário e também o converte para float.',
      18: 'if verifica se a operação escolhida foi o sinal de soma "+". Em Python usamos == para comparar igualdade.',
      19: 'Soma os dois valores e guarda o total na variável "resultado". Note o recuo (indentação) de 4 espaços.',
      20: 'Uma "f-string" permite embutir variáveis diretamente dentro do texto usando chaves {}.',
      22: 'elif significa "senão se". Só é testado se o if anterior foi falso.',
      26: 'Testa se a operação escolhida foi multiplicação com o caractere asterisco (*).',
      30: 'Testa a divisão com a barra invertida (/).',
      32: 'Verificação defensiva: checa se num2 é diferente de zero (!= 0) antes de fazer a divisão.',
      35: 'Caso num2 seja 0, evita o travamento do programa informando uma mensagem de erro clara.',
      38: 'else ("senão"): executa caso o usuário tenha digitado um símbolo que não seja nenhum dos 4 permitidos.'
    }
  },

  funcoes: {
    id: 'funcoes',
    title: '2. Versão com Funções (def)',
    subtitle: 'Modular e reutilizável',
    description: 'Ensina o conceito fundamental de funções em Python. O código fica dividido em pequenos blocos especializados.',
    code: `# ===================================================
# CALCULADORA COM FUNÇÕES (DEF)
# ===================================================

# Definindo cada operação matemática como uma função própria
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

# Função principal que comanda a calculadora
def calculadora():
    print("--- CALCULADORA COM FUNÇÕES ---")
    
    n1 = float(input("Digite o 1º número: "))
    op = input("Operação (+, -, *, /): ")
    n2 = float(input("Digite o 2º número: "))
    
    if op == "+":
        res = somar(n1, n2)
    elif op == "-":
        res = subtrair(n1, n2)
    elif op == "*":
        res = multiplicar(n1, n2)
    elif op == "/":
        res = dividir(n1, n2)
    else:
        res = "Operação inválida!"
        
    print(f"Resultado: {res}")

# Inicia o programa chamando a função principal
calculadora()
`,
    lineExplanations: {
      6: 'A palavra-chave "def" cria uma nova função personalizada chamada "somar" que recebe dois parâmetros: a e b.',
      7: '"return" entrega de volta o valor calculado para quem chamou a função.',
      15: 'A função dividir faz a checagem do denominador zero antes de retornar o cálculo.',
      21: 'Criamos uma função "calculadora()" para concentrar a lógica de interação com o usuário.',
      28: 'Chamamos a função somar(n1, n2) passando os valores digitados pelo usuário.',
      40: 'Esta linha chama a função principal para iniciar a execução do programa.'
    }
  },

  completo: {
    id: 'completo',
    title: '3. Versão Completa (Loop e Validação)',
    subtitle: 'Com while e try/except',
    description: 'Como programas reais funcionam: não trava se o usuário digitar letras por engano e pergunta se deseja fazer outro cálculo.',
    code: `# ===================================================
# CALCULADORA ROBUSTA COM LOOP E TRATAMENTO DE ERROS
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
    # 1. Obtém os números de forma segura
    n1 = obter_numero("Digite o primeiro número: ")
    n2 = obter_numero("Digite o segundo número: ")
    
    # 2. Escolha da operação
    print("Operações disponíveis: [+] Soma  [-] Subtração  [*] Multiplicação  [/] Divisão")
    op = input("Escolha a operação: ").strip()
    
    # 3. Realização do cálculo
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
    else:
        print("-> Operação não reconhecida!")
        
    # 4. Pergunta se quer continuar
    continuar = input("\\nDeseja fazer outro cálculo? (s/n): ").strip().lower()
    if continuar != 's':
        print("Obrigado por usar a calculadora. Até logo!")
        break
`,
    lineExplanations: {
      5: 'Uma função utilitária com docstring (""") para validar entradas numéricas.',
      7: '"while True" cria um laço de repetição infinito que só para quando um número válido é digitado.',
      8: '"try" tenta converter o que foi digitado para float.',
      10: '"except ValueError" captura o erro caso o usuário tenha digitado letras, impedindo que o Python encerre abruptamente.',
      15: 'O laço principal do programa permite realizar quantos cálculos o usuário desejar.',
      37: '.strip().lower() limpa espaços extras nas pontas e converte o texto para minúsculas.',
      39: '"break" interrompe imediatamente o laço while True e encerra o programa.'
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
    id: 'input-float',
    title: '1. Entrada de Dados: input() e float()',
    codeSnippet: 'num1 = float(input("Digite um número: "))',
    badge: 'Entrada & Tipagem',
    summary: 'A função input() sempre lê os dados digitados como texto (string). Se você somar "5" + "5", o Python vai juntar os textos resultando em "55" em vez de 10. Por isso, envolvemos com float() para converter em número decimal.',
    whyItMatters: 'Sem conversão de tipo, computadores tratam números como sequências de caracteres alfabéticos.',
    commonMistake: 'Esquecer o float() ou int(): num = input("Valor: ") gera TypeError quando você tenta subtrair ou dividir.'
  },
  {
    id: 'operators',
    title: '2. Os 4 Operadores Matemáticos',
    codeSnippet: `soma = 10 + 5       # Resultado: 15
subtracao = 10 - 5  # Resultado: 5
multi = 10 * 5      # Resultado: 50
divisao = 10 / 5    # Resultado: 2.0 (sempre float)`,
    badge: 'Aritmética',
    summary: 'Em Python usamos + para adição, - para subtração, * (asterisco) para multiplicação e / (barra) para divisão. Note que a divisão sempre produz um número float no Python 3, mesmo que a divisão seja exata.',
    whyItMatters: 'São os tijolos básicos de qualquer cálculo computacional.',
    commonMistake: 'Usar "x" para multiplicar ou ":" para dividir. No teclado de programação é sempre * e /.'
  },
  {
    id: 'conditionals',
    title: '3. Tomada de Decisão: if, elif e else',
    codeSnippet: `if operacao == "+":
    resultado = n1 + n2
elif operacao == "-":
    resultado = n1 - n2
else:
    print("Opção inválida")`,
    badge: 'Fluxo Condicional',
    summary: 'O computador precisa escolher qual conta fazer com base no símbolo digitado. O "if" testa a primeira opção; se não for ela, o "elif" testa a próxima; se nenhuma for verdadeira, o "else" captura qualquer outro caso.',
    whyItMatters: 'Permite que seu código tome caminhos diferentes de acordo com a vontade do usuário.',
    commonMistake: 'Usar um único sinal de igual (=) para testar igualdade. Em Python: = atribui valor, == compara se é igual.'
  },
  {
    id: 'zero-division',
    title: '4. Cuidados com a Divisão por Zero',
    codeSnippet: `if num2 != 0:
    resultado = num1 / num2
else:
    print("Não é possível dividir por zero!")`,
    badge: 'Prevenção de Erros',
    summary: 'Na matemática, a divisão por zero é indefinida. No Python, se você tentar rodar 10 / 0, o interpretador dispara o erro fatal ZeroDivisionError e fecha o programa. Verificar se o divisor é diferente de zero antes de dividir é uma boa prática essencial.',
    whyItMatters: 'Programas de qualidade tratam cenários extremos amigavelmente em vez de travar.',
    commonMistake: 'Dividir diretamente sem checar se num2 == 0.'
  },
  {
    id: 'f-strings',
    title: '5. Formatação com f-strings',
    codeSnippet: 'print(f"O resultado de {num1} + {num2} é {resultado}")',
    badge: 'Saída Formatada',
    summary: 'Colocar a letra "f" antes das aspas diz ao Python que aquela string aceita código dentro de chaves {}. O Python calcula ou insere as variáveis automaticamente no texto, de forma limpa e legível.',
    whyItMatters: 'Muito mais fácil e limpo do que concatenar strings com vários sinais de + e conversões str().',
    commonMistake: 'Esquecer a letra "f" antes das aspas: print("{num1}") vai imprimir literalmente "{num1}".'
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
    question: 'Se o usuário digitar "7" no comando x = input("Número: ") e depois fizermos x + x, qual será o resultado?',
    options: ['14', '"77"', 'Erro no código', '0'],
    correctIndex: 1,
    explanation: 'Como o input() retorna uma string (texto), o operador + junta os dois textos ("7" + "7" = "77"). Para somar numericamente, precisamos de float(x) ou int(x)!'
  },
  {
    id: 2,
    question: 'Qual é a diferença entre = e == em Python?',
    options: [
      'Não há diferença, ambos fazem a mesma coisa',
      '= compara se dois valores são iguais, == atribui um valor',
      '= atribui valor a uma variável, == compara igualdade',
      '== só pode ser usado para números'
    ],
    correctIndex: 2,
    explanation: 'Exatamente! x = 10 guarda o número 10 na variável x. Já if x == 10: pergunta ao computador se o conteúdo de x é igual a 10.'
  },
  {
    id: 3,
    question: 'O que acontece no Python ao tentar executar a operação 15 / 0 sem tratamento?',
    options: [
      'Retorna o valor infinito (inf)',
      'Retorna o número 0',
      'O Python trava com o erro ZeroDivisionError',
      'O Python arredonda para 15'
    ],
    correctIndex: 2,
    explanation: 'A divisão por zero não é permitida matematicamente. O Python lança uma exceção ZeroDivisionError e interrompe o programa se não houver um "if" ou "try/except".'
  },
  {
    id: 4,
    question: 'Por que o uso de f-strings como f"Total: {res}" é recomendado no Python moderno?',
    options: [
      'Porque deixa o código mais limpo e substitui variáveis dentro de {} de forma direta',
      'Porque é a única maneira de usar a função print()',
      'Porque converte qualquer texto em número automaticamente',
      'Porque executa mais lento propositalmente para dar tempo de ler'
    ],
    correctIndex: 0,
    explanation: 'As f-strings (introduzidas no Python 3.6) são a forma mais legível, rápida e elegante de combinar textos com valores de variáveis!'
  }
];
