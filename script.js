let display = document.getElementById('display');
let lastOperation = null;
let lastNumber = null;
let mustClear = false; // Flag to enforce clearing the display if needed

// Initialize the display to '0'
display.value = '0';

function append(num) {
    // If the display needs to be cleared due to a long result
    if (mustClear) {
        return;
    }

    // Handle the specific '0' case first
    if (display.value === '0' && !isNaN(num)) {
        if (num !== '0') {
            display.value = num.toString(); // Replace initial '0' with the new number
            return;
        } else {
            return; // If '0' is pressed when display is '0', just return
        }
    }

    // Handle '0' after an operator
    if (['+', '-', '*', '/'].includes(display.value[display.value.length - 1]) && !isNaN(num)) {
        if (num === '0') {
            display.value += '0'; // Allow a single '0' after an operator
            return;
        } else {
            display.value += num; // If any number other than '0' is pressed, append that number after operator
            return;
        }
    }

    // Replace '0' after an operator with a new number
    if (!isNaN(display.value[display.value.length - 1]) && 
        display.value[display.value.length - 2] && 
        ['+', '-', '*', '/'].includes(display.value[display.value.length - 2]) && 
        display.value[display.value.length - 1] === '0' && 
        !isNaN(num)) {
        display.value = display.value.slice(0, -1) + num;
        return;
    }

    // Check if the current number sequence is already 7 digits long
    let currentNumber = display.value.split(/[\+\-\*\/]/).pop();

    if (!isNaN(num) && currentNumber.length >= 7) {
        return;
    }

    // Handle 'Error' and general operations
    if (display.value === 'Error' && isNaN(num)) {
        return;
    } else if (display.value === 'Error') {
        display.value = '';
        lastOperation = null;
        lastNumber = null;
    }

    if (typeof num === 'number' || !isNaN(num)) {
        display.value += num;
    } else {
        if (['+', '-', '*', '/'].includes(display.value[display.value.length - 1])) {
            display.value = display.value.slice(0, -1) + num;
            lastOperation = num;
        } else {
            if (lastOperation) {
                calculate();
            }

            if (display.value !== 'Error') {
                lastOperation = num;
                lastNumber = parseFloat(display.value);
                display.value += num;
            }
        }
    }
}

function clearDisplay() {
    display.value = '0';
    lastOperation = null;
    lastNumber = null;
    mustClear = false; // Reset the flag when the display is cleared
}

function calculate() {
    // If the display needs to be cleared due to a long result
    if (mustClear) {
        return;
    }

    if (lastNumber !== null && lastOperation) {
        if (['+', '-', '*', '/'].includes(display.value[display.value.length - 1])) {
            return;
        }
        let currentNumber = parseFloat(display.value.split(lastOperation)[1]);
        if (isNaN(currentNumber)) {
            return;
        }
        let result;

        switch (lastOperation) {
            case '+':
                result = lastNumber + currentNumber;
                break;
            case '-':
                result = lastNumber - currentNumber;
                break;
            case '*':
                result = lastNumber * currentNumber;
                break;
            case '/':
                if (currentNumber !== 0) {
                    result = lastNumber / currentNumber;
                } else {
                    display.value = 'Error';
                    lastOperation = null;
                    lastNumber = null;
                    return;
                }
                break;
            default:
                display.value = 'Error';
                lastOperation = null;
                lastNumber = null;
                return;
        }

        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
            lastOperation = null;
            lastNumber = null;
            return;
        }

        display.value = result;
        lastNumber = result;
        
        if (display.value.length > 7) {
            mustClear = true;
        }
    }
}

// Prevent user input when 'Error' is displayed or if the display needs to be cleared
display.addEventListener('keydown', function(event) {
    if (display.value === 'Error' || mustClear) {
        event.preventDefault();
    }
});

