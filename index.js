let numbers = document.querySelectorAll('.button_number'),
    operations = document.querySelectorAll('.button_operator'),
    clearButtons = document.querySelectorAll('.button_clear'),
    decimalButton = document.getElementById('decimal'),
    result = document.getElementById('result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';


for(let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', (e) => {
           numberPress(e.target.textContent);
    });
};

for(let i = 0; i < operations.length; i++) {
    let operationButton = operations[i];
        operationButton.addEventListener('click', (e) => {
        operationPress(e.target.textContent);
    });
};

for(let i = 0; i < clearButtons.length; i++) {
    let resetButton = clearButtons[i];
        resetButton.addEventListener('click', (e) => {
        clear(e.target.textContent);
    });
};

decimalButton.addEventListener('click', decimal);

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        };
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