let display = document.getElementById('display');
let lastOperation = null;
let lastNumber = null;

function append(num) {
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
      lastOperation = num;
      lastNumber = parseFloat(display.value);
      display.value += num;
    }
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
          return;
        }
        break;
      default:
        display.value = 'Error';
        return;
    }

    display.value = result;
    lastNumber = result;
  }
}

