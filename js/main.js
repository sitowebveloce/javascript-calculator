//*** CALCULATOR */
const calculator = document.querySelector('.calculator');
const openCalcBtn = document.querySelector('.btn_calc');
const numsBtn = document.querySelectorAll('[data-num]');
const opsBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equal]');
const delBtn = document.querySelector('[data-del]');
const acBtn = document.querySelector('[data-all-clear]');
const currentInput = document.querySelector('.current');
const totalInput = document.querySelector('.total');
const operator = document.querySelector('.operator');
const closeCalcBtn = document.querySelector('.close_calc');
let operatorValue = [];
let partialRes;
let totalRes;

// CURRENT OPERATION
function currentOperation(num) {
    // STRING LAST VALUE
    let lastValue = currentInput.value.toString().slice(-1);
    // console.log(lastValue);
    // SPLIT ON NUMBERS
    if (num === '.' && lastValue.includes('.')) return;
    currentInput.value = currentInput.value + num;
}

// NUMBERS EVENT LISTENER
numsBtn.forEach(b => {
        b.addEventListener('click', () => {
            let num = b.innerText;
            // console.log(num);
            currentOperation(num);
        })
    })
    // OPERATORS EVENT LISTENER
opsBtn.forEach(o => {
    // ON CLICK 
    o.addEventListener('click', () => {
        if (operatorValue.length === 0) {
            // CHECK IF THE CURRENT VALUE IS EMPTY
            if (currentInput.value === '') return;
            operatorValue.push(o.innerText);
            currentOperation(o.innerText);
        } else if (operatorValue.length === 1) {
            // SPLIT ON NUMBERS
            let values = currentInput.value.toString().split(/[^0-9\.]+/);
            console.log(currentInput.value);
            // console.log(eval(currentInput.value));
            console.log(operatorValue)
            console.log(values, values[1], operatorValue);
            // SPLIT ON MATH OPERATORS
            let search = currentInput.value.toString().search(/[-+*\/]/)
            console.log(search);
            if (search === 1 && values[1] === '') {
                deleteLastValue();
                currentOperation(o.innerText);
                // Clear
                operatorValue.length = 0;
                operatorValue.push(o.innerText);
                return;
            };

            // CHECK VALUES
            if (values.length === 3 || values[0] === '') {
                partialRes = eval(currentInput.value);
            } else if (values.length !== 2 || values[1] === '') {
                return
            } else {
                // CALC PARTIAL RESULT
                partialRes = calculateVal(values[0], operatorValue[0], values[1]);
            }
            // Set New Current Value
            currentInput.value = partialRes;
            // Clear
            operatorValue.length = 0;
            // Add operator
            operatorValue.push(o.innerText);
            currentOperation(o.innerText);
            partialRes = '';
        }
    });
})

// CALCULATE FN
function calculateVal(valOne, operator, valTwo) {
    console.log((+valOne), (+valTwo));
    let val;
    // Switch
    switch (operator) {
        case '+':
            val = +valOne + +valTwo;
            break;
        case '-':
            val = +valOne - +valTwo;
            break;
        case '*':
            val = +valOne * +valTwo;
            break;
        case '/':
            val = +valOne / +valTwo
            break;
        default:
            return;
    }
    console.log(val)
    console.log(eval(`${valOne} ${operator} ${valTwo}`));
    let shortEval = eval(`${valOne} ${operator} ${valTwo}`);
    return shortEval;
}
// EQUAL
equalBtn.addEventListener('click', () => {
    // SPLIT ON MATH OPERATORS
    let values = currentInput.value.toString().split(/[^0-9\.]+/);
    console.log(values);
    // CHECK VALUES
    if (values.length !== 2) return;
    let valOne = +values[0];
    let valTwo = +values[1];

    // Calculate
    totalRes = calculateVal(valOne, operatorValue[0], valTwo);


    // Clear
    currentInput.value = '';
    // Clear
    operatorValue.length = 0;
    // Show Total
    totalInput.value = totalRes;
})

// ALL CLEAR
acBtn.addEventListener('click', () => {
    currentInput.value = '';
    totalInput.value = '';
    operatorValue.length = 0;
});
// DEL
function deleteLastValue() {
    let currentInputeValue = currentInput.value;
    currentInput.value = currentInputeValue.substring(0, currentInputeValue.length - 1);
}
delBtn.addEventListener('click', () => {
    deleteLastValue();
});