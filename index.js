const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc__buttons');

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

function numberPress(number) {
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function operationPress(op) {
    localOperationMemory = display.value;
        
    if (op && memoryNewNumber) {
        memoryPendingOperation = op;
    } else {
        memoryNewNumber = true;
        switch (memoryPendingOperation) {
            case '+':
            memoryCurrentNumber += +localOperationMemory;  
            break;
            case  '-':
            memoryCurrentNumber -= +localOperationMemory;
            break;  
            case '*' :
            memoryCurrentNumber *= +localOperationMemory;
            break;  
            case '/' :
            memoryCurrentNumber /= +localOperationMemory;
            break;  
            default:
            memoryCurrentNumber = +localOperationMemory;  
        }
            display.value = +(memoryCurrentNumber.toFixed(9));
            memoryPendingOperation = op;
    }       
}

function decimal() {
    let localDecimalMemory = display.value;
        
    if (memoryNewNumber) {
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    } else if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.'
    }
    display.value = localDecimalMemory;
}

function clear(id) {
    if (id === 'ce') {
        display.value = '0' 
        memoryNewNumber = true;
    } else if(id === 'c') {
        display.value = '0' 
        memoryNewNumber = true;
        memoryCurrentNumber = 0,
        memoryPendingOperation = '';
    }
}

buttons.forEach(button => button.addEventListener('click', e => {
    const className = e.target.className;
    if (!e.target.matches('button')) {
        return;
    }
    else if (className === 'button button_number') {
        numberPress(e.target.textContent);
    } else if (className === 'button button_operator') {
        operationPress(e.target.textContent);
    } else if (className === 'button button_clear') {
        clear(e.target.textContent);
    } else if (className === 'button button_point') {
        decimal(e.target.textContent);
    }
}));
