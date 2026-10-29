# Calculadora Simples em Python 🧮

Projeto desenvolvido para a **Imersão Alura Engenharia de Software & IA**.

Esta aplicação em Python executa as quatro operações matemáticas fundamentais de forma simples, interativa e estruturada para quem está iniciando os estudos em programação.

---

## 🚀 Funcionalidades

- **Adição (`+`)**: Soma de dois valores.
- **Subtração (`-`)**: Diferença entre dois valores.
- **Multiplicação (`*`)**: Produto de dois fatores.
- **Divisão (`/`)**: Quociente com validação contra divisão por zero (`ZeroDivisionError`).
- **Porcentagem (`%`)**: Cálculo direto de porcentagem (ex: calcular `15%` de `200` resulta em `30.0`).
- **Tratamento de Exceções**: Proteção contra digitação de letras ou caracteres inválidos via `try/except ValueError`.
- **Compatibilidade com decimais**: Suporte completo a números reais através da conversão com `float()`.

---

## 🧪 Testes Automatizados

O projeto inclui uma suíte de testes unitários que valida todas as operações e casos de borda:
```bash
python -m unittest test_calculadora.py
```

---

## 🛠️ Conceitos Praticados

1. **Entrada e Saída**: `input()` para capturar dados do usuário e `print()` com `f-strings` formatadas.
2. **Tipagem e Conversão de Dados**: Conversão explícita de `string` para `float`.
3. **Controle de Fluxo**: Estruturas de decisão encadeadas `if`, `elif` e `else`.
4. **Tratamento de Exceções**: Prevenção de travamentos causados por dados inválidos (`ValueError`) e divisão por zero.
5. **Modularização**: Organização do código em funções e o uso da convenção `if __name__ == '__main__':`.

---

## 💻 Como Executar

### Pré-requisitos
- Ter o **Python 3.8+** instalado no seu computador.

### Passo a passo
1. Clone este repositório ou baixe o arquivo `calculadora.py`:
   ```bash
   git clone https://github.com/DaniloCostaS/ImersaoAluraEngenhariaSoftwareIA.git
   cd ImersaoAluraEngenhariaSoftwareIA
   ```

2. Execute o script no terminal:
   ```bash
   python calculadora.py
   # ou
   python3 calculadora.py
   ```

3. Siga as instruções exibidas na tela para digitar os números e a operação desejada!

---

Desenvolvido por **Danilo Costa** durante a Imersão Alura Engenharia de Software & IA.
