//*** SELECT CALCULATOR ELEMENTS */
// const calculator = document.querySelector('.calculator');
// const openCalcBtn = document.querySelector('.btn_calc');
const numsBtn = document.querySelectorAll('[data-num]');
const opsBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equal]');
const delBtn = document.querySelector('[data-del]');
const acBtn = document.querySelector('[data-all-clear]');
const currentInput = document.querySelector('.current');
const totalInput = document.querySelector('.total');
// const operator = document.querySelector('.operator');
// const closeCalcBtn = document.querySelector('.close_calc');
// VARS
let operatorValue = [];
let partialRes;
let totalRes;
// SOUND EFFECT
let pushNum = new Audio('./sounds/press.wav');
let pushOperator = new Audio('./sounds/operator.wav');
let pushDel = new Audio('./sounds/del.wav');
let pushEqual = new Audio('./sounds/equal.wav');
let pushAc = new Audio('./sounds/ac.wav');

// CURRENT OPERATION
function currentOperation(num) {
    // FIND STRING LAST VALUE
    let lastValue = currentInput.value.toString().slice(-1);
    // console.log(lastValue);
    if (num === '.' && lastValue.includes('.')) return;
    currentInput.value = currentInput.value + num;
}

// NUMBERS EVENT LISTENER
numsBtn.forEach(b => {
    b.addEventListener('click', () => {
        pushNum.play();
        let num = b.innerText;
        // console.log(num);
        currentOperation(num);
    });
});

// MATH OPERATORS EVENT LISTENER
opsBtn.forEach(o => {
    // ON CLICK 
    o.addEventListener('click', () => {
        pushOperator.play();
        if (operatorValue.length === 0) {
            // CHECK IF THE CURRENT VALUE IS EMPTY
            if (currentInput.value === '') return;
            operatorValue.push(o.innerText);
            currentOperation(o.innerText);
        } else if (operatorValue.length === 1) {
            // SPLIT ON NUMBERS
            let values = currentInput.value.toString().split(/[^0-9\.]+/);
            // console.log(values, values[1], operatorValue);
            // SPLIT ON MATH OPERATORS
            const regex = new RegExp(/[-+*\/]/);
            let search = regex.test(currentInput.value.toString());
            // console.log(search);
            if (search === true && values[1] === '') {
                deleteLastValue();
                currentOperation(o.innerText);
                // Refresh operator value
                operatorValue.length = 0;
                operatorValue.push(o.innerText);
                return;
            };

            // CHECK NEGATIVE VALUES
            if (values.length === 3 || values[0] === '') {
                // EVAL
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
            partialRes = '';
            operatorValue.length = 0;
            // Add operator
            operatorValue.push(o.innerText);
            currentOperation(o.innerText);
        }
    });
})

// CALCULATE FN
function calculateVal(valOne, operator, valTwo) {
    // console.log((+valOne), (+valTwo));
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
    // console.log(val)
    // console.log(eval(`${valOne} ${operator} ${valTwo}`));
    // SHORT WITH EVAL!!!
    // let shortEval = eval(`${valOne} ${operator} ${valTwo}`);
    // return shortEval;
    return val;
}
// EQUAL
equalBtn.addEventListener('click', () => {
    pushEqual.play();
    // SPLIT ON NUMBERS
    let values = currentInput.value.toString().split(/[^0-9\.]+/);
    // console.log(values);
    // CHECK FOR NEGATIVE VALUES
    if(values.length === 3 || values[0] === ''){
        // Eval
        totalRes = eval(currentInput.value);
        // Clear
        currentInput.value = '';
        operatorValue.length = 0;
        // Show total
        totalInput.value = totalRes;
        return;
    };

    // CHECK VALUES
    if (values.length !== 2) return;
    let valOne = +values[0];
    let valTwo = +values[1];

    // Calculate
    totalRes = calculateVal(valOne, operatorValue[0], valTwo);

    // Clear
    currentInput.value = '';
    operatorValue.length = 0;
    // Show Total
    totalInput.value = totalRes;
})

// ALL CLEAR
acBtn.addEventListener('click', () => {
    pushAc.play();
    currentInput.value = '';
    totalInput.value = '';
    operatorValue.length = 0;
});
// DEL
function deleteLastValue() {
     // FIND STRING LAST VALUE
     let lastValue = currentInput.value.toString().slice(-1);
     // SEARCH FOR MATH OPERATORS
     const regex = new RegExp(/[-+*\/]/);
     let search = regex.test(lastValue);
     // console.log(lastValue);
     if (search) {
         operatorValue.length = 0;
         currentInput.value = currentInput.value.substring(0, currentInput.value.length - 1);
     }else{
         currentInput.value = currentInput.value.substring(0, currentInput.value.length - 1);
     }
}
delBtn.addEventListener('click', () => {
    pushDel.play();
    deleteLastValue();
});