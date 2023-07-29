let display = document.getElementById('display');

function append(num) {
  display.value += num;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
  } catch {
    display.value = 'Error';
  }
}
