// THEME SWITCHER

document.documentElement.className = 'theme-basic';

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function basicFunction() {
        setTheme('theme-basic');
    }

function lightFunction(){
    setTheme('theme-light');
}

function darkFunction(){
    setTheme('theme-dark');
}

// OPERATIONS

class Calculator{
    constructor(previousOperandTextElement , currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand ='';
        this.previousOperand ='';
        this.operation = undefined;

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.currentOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand ='';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current))return;

        switch(this.operation){
                case '+':
                computation = prev + current;
                break;
                case '-':
                computation = prev - current;
                break;
                case 'x':
                computation = prev * current;
                break;
                case '/':
                computation = prev / current;
                break;
                 default:
                return;

        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';


    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const inteherDigist = parseFloat(stringNumber.split('.')[0]);
        const deciamlDigist = stringNumber.split('.')[1];

        let integerDisplay;
        if(isNaN(inteherDigist)){
            integerDisplay = '';
        }else{
            integerDisplay = inteherDigist.toLocaleString('en', {
                maximumFractionDigits: 0 });
        }

        if(deciamlDigist != null){
            return `${integerDisplay}.${deciamlDigist}`;
        }else{
            return integerDisplay;
        }

       
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;

        }else{
            this.previousOperandTextElement.innerText='';
        }
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const resetButton = document.querySelector('[data-reset]');
const currentOperandTextElement = document.querySelector('[data-current]');
const previousOperandTextElement = document.querySelector('[data-previous]');



const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });    

});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });    

});


equalsButton.addEventListener('click' , button => {
    calculator.compute();
    calculator.updateDisplay();
});

resetButton.addEventListener('click' , button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click' , button => {
    calculator.delete();
    calculator.updateDisplay();
});

