"""
Calculadora Simples em Python - As 4 Operações Básicas
Projeto desenvolvido para a Imersão Alura Engenharia de Software & IA
"""

def calculadora():
    print("==========================================")
    print("      CALCULADORA SIMPLES EM PYTHON       ")
    print("==========================================")
    print("Operações disponíveis:")
    print("  [+] Adição")
    print("  [-] Subtração")
    print("  [*] Multiplicação")
    print("  [/] Divisão")
    print("==========================================")

    try:
        # Entrada do primeiro número
        num1 = float(input("Digite o primeiro número: "))

        # Escolha da operação
        operacao = input("Digite a operação (+, -, *, /): ").strip()

        # Entrada do segundo número
        num2 = float(input("Digite o segundo número: "))

        print("\nProcessando cálculo...")

        # Estrutura condicional para executar a operação correta
        if operacao == "+":
            resultado = num1 + num2
            print(f"-> Resultado: {num1} + {num2} = {resultado}")

        elif operacao == "-":
            resultado = num1 - num2
            print(f"-> Resultado: {num1} - {num2} = {resultado}")

        elif operacao == "*":
            resultado = num1 * num2
            print(f"-> Resultado: {num1} * {num2} = {resultado}")

        elif operacao == "/":
            # Tratamento da divisão por zero
            if num2 != 0:
                resultado = num1 / num2
                print(f"-> Resultado: {num1} / {num2} = {resultado}")
            else:
                print("-> Erro matemático: Não é possível dividir por zero!")

        else:
            print("-> Operação inválida! Por favor, utilize +, -, * ou /.")

    except ValueError:
        print("-> Erro: Por favor, digite apenas números válidos.")

    print("\nObrigado por utilizar a calculadora!")

if __name__ == "__main__":
    calculadora()
