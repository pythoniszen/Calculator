let display = document.getElementById('display');
let lastOperation = null;
let lastNumber = null;

function append(num) {
  // If the display reads 'Error', clear it first
  if (display.value === 'Error') {
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

        // Check here if the result of the calculation was 'Error'
        if (display.value === 'Error') {
            lastOperation = null;
            lastNumber = null;
            return; // Exit function without appending operator.
        }

        lastOperation = num;
        lastNumber = parseFloat(display.value);
        display.value += num;
    }
  }

}

function removeOperatorIfAny() {
  if (['+', '-', '*', '/'].includes(display.value[display.value.length - 1])) {
    display.value = display.value.slice(0, -1);
  }
}

function clearDisplay() {
  display.value = '';
  lastOperation = null;
  lastNumber = null;
}

function calculate() {
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
          removeOperatorIfAny(); // Remove operator after "Error" is detected
          lastOperation = null;
          lastNumber = null;
          return;
        }
        break;
      default:
        display.value = 'Error';
        removeOperatorIfAny(); // Remove operator after "Error" is detected
        lastOperation = null;
        lastNumber = null;
        return;
    }

    // Check for valid result (not infinity or NaN)
    if (!isFinite(result) || isNaN(result)) {
      display.value = 'Error';
      removeOperatorIfAny(); // Remove operator after "Error" is detected
      lastOperation = null;
      lastNumber = null;
      return;
    }

    display.value = result;
    lastNumber = result;
  }
}

// Prevent user input when 'Error' is displayed
display.addEventListener('keydown', function (event) {
  if (display.value === 'Error') {
    event.preventDefault();
  }
});
