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
        };
    };

function operationPress(op) {
    localOperationMemory = display.value;
        
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        switch (MemoryPendingOperation) {
            case '+':
            MemoryCurrentNumber += +localOperationMemory;  
            break;
            case  '-':
            MemoryCurrentNumber -= +localOperationMemory;
            break;  
            case '*' :
            MemoryCurrentNumber *= +localOperationMemory;
            break;  
            case '/' :
            MemoryCurrentNumber /= +localOperationMemory;
            break;  
            default:
            MemoryCurrentNumber = +localOperationMemory;  
        };
            display.value = MemoryCurrentNumber;
            MemoryPendingOperation = op;
    };       
};

function decimal() {
    let localDecimalMemory = display.value;
        
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.'
        }
    };
        display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0' 
        MemoryNewNumber = true;
    } else if(id === 'c') {
        display.value = '0' 
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0,
        MemoryPendingOperation = '';
    };
};

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
