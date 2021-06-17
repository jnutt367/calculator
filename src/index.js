class Calculator {
    constructor(previousCalculationTextElement, currentCalculationTextElement) {
        this.previousCalculationTextElement = previousCalculationTextElement;
        this.currentCalculationTextElement = currentCalculationTextElement;
        this.clear();
    }

    clear() {
        this.currentCalculation = '';
        this.previousCalculation = '';
        this.operation = undefined;
    }

    delete() {
        this.currentCalculation = this.currentCalculation.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number === '.' && this.currentCalculation.includes('.')) return
        this.currentCalculation = this.currentCalculation.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentCalculation === '') return
        if (this.previousCalculation !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousCalculation = this.currentCalculation;
        this.currentCalculation = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousCalculation);
        const current = parseFloat(this.currentCalculation);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentCalculation = computation;
        this.operation = undefined;
        this.previousCalculation = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentCalculationTextElement.innerText =
            this.getDisplayNumber(this.currentCalculation);
        if (this.operation != null) {
            this.previousCalculationTextElement.innerText =
                `${this.getDisplayNumber(this.previousCalculation)} ${this.operation}`
        } else {
            this.previousCalculationTextElement.innerText = '';
        }
    }
};

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousCalculationTextElement = document.querySelector('[data-previous-calculation]');
const currentCalculationTextElement = document.querySelector('[data-current-calculation]');

const calculator = new Calculator(previousCalculationTextElement, currentCalculationTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateDisplay()
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});