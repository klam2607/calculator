import { shuntingYard, evaluatePostfix } from "./calculator-algorithms.js";
/*
    Calculator app
*/

let numericButtons = document.querySelectorAll('.numeric-button');
let operatorButtons = document.querySelectorAll('.operator-button');

let acButton = document.querySelector('.ac-button');
let deleteButton = document.querySelector('.delete-button');

let dotButton = document.querySelector('.dot-button');

let bracketButtons = document.querySelectorAll('.bracket-button');

let equalButton = document.querySelector('.equal-button');

let screen = document.querySelector('.calculator-screen-main');

const States = {
    Normal: 0, 
    Error: 1, 
}

let state = States.Normal;

bracketButtons.forEach((bracketButton) => {
    if (state == States.Error) {
        screen.value = "";
        state = States.Normal;
        return;
    }

    bracketButton.addEventListener("click", e => {
        screen.value += bracketButton.innerHTML;
    });
});

deleteButton.addEventListener("click", e => {
    if (state == States.Error) {
        screen.value = "";
        state = States.Normal;
        return;
    }

    screen.value = screen.value.slice(0, -1);
});

acButton.addEventListener("click", e => {
    if (state == States.Error) {
        screen.value = "";
        state = States.Normal;
        return;
    }

    screen.value = '';
})


dotButton.addEventListener("click", e => {
    if (state == States.Error) {
        screen.value = "";
        state = States.Normal;
        return;
    }

    screen.value += dotButton.innerHTML;
});

equalButton.addEventListener("click", e => {
    if (state == States.Error) {
        screen.value = "";
        state = States.Normal;
        return;
    }

    if (screen.value.length == 0) {
        return;
    }

    let postfixNotation = shuntingYard(screen.value); 

    try {
        screen.value = evaluatePostfix(postfixNotation);
    } catch (error) {
        screen.value = error.message;
        state = States.Error;
    }
});

numericButtons.forEach((numericButton) => {
    numericButton.addEventListener("click", e => {
        if (state == States.Error) {
            screen.value = "";
            state = States.Normal;
            return;
        }
        screen.value += numericButton.innerHTML;
    });
});

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", e => {
        if (state == States.Error) {
            screen.value = "";
            state = States.Normal;
            return;
        }
        screen.value += operatorButton.innerHTML;
    });
});


