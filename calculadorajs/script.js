document.addEventListener('DOMContentLoaded', function() {
    // Estado inicial da calculadora
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    // Seleção dos elementos da calculadora
    const screen = document.querySelector('.calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    // Atualiza o display da calculadora
    function updateDisplay() {
        screen.value = calculator.displayValue;
    }
    // Funções para manipular os inputs
    function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;
        // Se estiver esperando o segundo operando, substitui o display
        if (waitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else { // Caso contrário, concatena o dígito
            calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }
ch
    // Função para lidar com o ponto decimal
    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand) {
            calculator.displayValue = '0.';
            calculator.waitingForSecondOperand = false;
            return;
        }
        // Se já houver um ponto, não faz nada
        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    // Função para lidar com operadores
    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);
        // Se já houver um operador e estiver esperando o segundo operando, substitui o operador
        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }
        // Se for o primeiro operando, armazena-o
        if (firstOperand == null) {
            calculator.firstOperand = inputValue;
        } else if (operator) { // Caso contrário, realiza o cálculo
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true; // Prepara para o próximo operando
        calculator.operator = nextOperator; // Armazena o operador
    }
    // Função de cálculo
    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }
    // Função para resetar a calculadora
    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }
    // Evento de clique nos botões
    keys.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) return; // Ignora se não for botão

        if (target.classList.contains('operator')) { // Se for operador
            handleOperator(target.value);
            updateDisplay();
            return;
        }

        if (target.classList.contains('decimal')) { // Se for ponto decimal
            inputDecimal(target.value);
            updateDisplay();
            return;
        }

        if (target.classList.contains('all-clear')) { // Se for AC
            resetCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equal-sign')) { // Se for igual
            if (calculator.operator) {
                handleOperator(target.value);
            }
            updateDisplay();
            return;
        }

        inputDigit(target.value); // Se for dígito
        updateDisplay(); // Atualiza o display
    });

    updateDisplay();
});