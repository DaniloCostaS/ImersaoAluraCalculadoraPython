"""
Calculadora Simples em Python - Operações Básicas e Porcentagem
Projeto desenvolvido para a Imersão Alura Engenharia de Software & IA
"""

def calcular(num1, operacao, num2):
    """
    Função pura que calcula a operação e retorna (resultado, erro).
    Permite testes unitários automatizados e desacoplamento.
    """
    if operacao == "+":
        return num1 + num2, None
    elif operacao == "-":
        return num1 - num2, None
    elif operacao == "*":
        return num1 * num2, None
    elif operacao == "/":
        if num2 != 0:
            return num1 / num2, None
        return None, "Erro matemático: Não é possível dividir por zero!"
    elif operacao == "%":
        # Cálculo de porcentagem: num2% de num1 -> (num1 * num2) / 100
        return (num1 * num2) / 100, None
    else:
        return None, "Operação inválida! Por favor, utilize +, -, *, / ou %."

def calculadora():
    print("==========================================")
    print("      CALCULADORA SIMPLES EM PYTHON       ")
    print("==========================================")
    print("Operações disponíveis:")
    print("  [+] Adição")
    print("  [-] Subtração")
    print("  [*] Multiplicação")
    print("  [/] Divisão")
    print("  [%] Porcentagem (ex: 15% de 200)")
    print("==========================================")

    try:
        # Entrada do primeiro número
        num1 = float(input("Digite o primeiro número (ou valor base): "))

        # Escolha da operação
        operacao = input("Digite a operação (+, -, *, /, %): ").strip()

        # Entrada do segundo número
        if operacao == "%":
            num2 = float(input("Digite a porcentagem desejada (%): "))
        else:
            num2 = float(input("Digite o segundo número: "))

        print("\nProcessando cálculo...")

        resultado, erro = calcular(num1, operacao, num2)

        if erro:
            print(f"-> {erro}")
        else:
            if operacao == "%":
                print(f"-> Resultado: {num2}% de {num1} = {resultado}")
            else:
                print(f"-> Resultado: {num1} {operacao} {num2} = {resultado}")

    except ValueError:
        print("-> Erro: Por favor, digite apenas números válidos.")

    print("\nObrigado por utilizar a calculadora!")

if __name__ == "__main__":
    calculadora()
