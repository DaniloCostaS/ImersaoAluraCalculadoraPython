import unittest
from calculadora import calcular

class TestCalculadora(unittest.TestCase):
    def test_adicao(self):
        res, err = calcular(10, "+", 5)
        self.assertIsNone(err)
        self.assertEqual(res, 15.0)

        res, err = calcular(-4, "+", 9)
        self.assertIsNone(err)
        self.assertEqual(res, 5.0)

    def test_subtracao(self):
        res, err = calcular(20, "-", 8)
        self.assertIsNone(err)
        self.assertEqual(res, 12.0)

        res, err = calcular(5.5, "-", 2.5)
        self.assertIsNone(err)
        self.assertEqual(res, 3.0)

    def test_multiplicacao(self):
        res, err = calcular(7, "*", 6)
        self.assertIsNone(err)
        self.assertEqual(res, 42.0)

        res, err = calcular(10, "*", 0)
        self.assertIsNone(err)
        self.assertEqual(res, 0.0)

    def test_divisao(self):
        res, err = calcular(50, "/", 2)
        self.assertIsNone(err)
        self.assertEqual(res, 25.0)

        res, err = calcular(7, "/", 2)
        self.assertIsNone(err)
        self.assertEqual(res, 3.5)

    def test_divisao_por_zero(self):
        res, err = calcular(10, "/", 0)
        self.assertIsNone(res)
        self.assertIn("Não é possível dividir por zero", err)

    def test_porcentagem_nova_operacao(self):
        # 15% de 200 = 30.0
        res, err = calcular(200, "%", 15)
        self.assertIsNone(err)
        self.assertEqual(res, 30.0)

        # 50% de 80 = 40.0
        res, err = calcular(80, "%", 50)
        self.assertIsNone(err)
        self.assertEqual(res, 40.0)

        # 10% de 1000 = 100.0
        res, err = calcular(1000, "%", 10)
        self.assertIsNone(err)
        self.assertEqual(res, 100.0)

        # 0% de 500 = 0.0
        res, err = calcular(500, "%", 0)
        self.assertIsNone(err)
        self.assertEqual(res, 0.0)

        # 100% de 75 = 75.0
        res, err = calcular(75, "%", 100)
        self.assertIsNone(err)
        self.assertEqual(res, 75.0)

    def test_operacao_invalida(self):
        res, err = calcular(10, "^", 2)
        self.assertIsNone(res)
        self.assertIn("Operação inválida", err)

if __name__ == '__main__':
    unittest.main()
