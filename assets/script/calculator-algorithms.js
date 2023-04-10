export {shuntingYard, evaluatePostfix};
import { binaryOperators, unaryOperators } from "./calculator-core.js";

function tokenizeMathExpression(expression) {
  let tokens = []
  let tempToken = expression.split(/([\+\-\x\/\(\)])/).filter(token => token.length > 0);

  for (let i = 0; i < tempToken.length; ++i) {
    let token = tempToken[i];
    let previous = tempToken[i - 1];
    let next = tempToken[i + 1];
    
    if (token !== '-') {
      tokens.push(token);
      continue;
    }

    if (isNaN(previous) == true && isNaN(next) == true) {
      tokens.push(token);
      continue;
    }

    if (isNaN(next) === true && isNaN(previous) === false) {
      tokens.push(token);
      continue;
    }
    
    if (isNaN(next) === false && isNaN(previous) === false) {
      tokens.push(token);
      continue;
    } 

    if (isNaN(previous) === true) {
      tokens.push("~");
    }
  }

  return tokens;
}

function shuntingYard(infixExpression) {
  let outputQueue = [];
  let operatorStack = [];
  
  const tokens = tokenizeMathExpression(infixExpression);

  tokens.forEach(token => {
    if (!isNaN(token)) {
      // Token is an operand
      outputQueue.push(Number(token));
    } else if (token === "(") {
      operatorStack.push(token); 
    } else if (token === ")") {
      while (operatorStack.length > 0 && operatorStack.at(-1) !== "(") {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    } else {
      // Token is an operator
      while (operatorStack.length > 0 &&
          (operatorStack.at(-1) in binaryOperators || operatorStack.at(-1) in unaryOperators) && 
          token.precedence <= operatorStack.at(-1).precedence) {
        outputQueue.push(operatorStack.at(-1));
      } 
      operatorStack.push(token);
    }
  });

  while (operatorStack.length !== 0) {
    outputQueue.push(operatorStack.pop());
  }

  console.log(outputQueue);

  return outputQueue;
}

function evaluatePostfix(tokens) {
  let stack = []

  tokens.forEach(token => {
    if (!isNaN(token)) {
      stack.push(token);
    } else if (token in binaryOperators) {
      
      let firstOperand = stack.pop();
      let secondOperand = stack.pop();

      if (firstOperand === undefined || secondOperand === undefined) {
        throw Error("Syntax ERROR");
      }

      let operation = binaryOperators[token].operation;

      let result = operation(secondOperand, firstOperand);

      stack.push(result);
    } else if (token in unaryOperators) {
      let firstOperand = stack.pop();

      if (firstOperand === undefined) {
        throw Error("Syntax ERROR");
      }

      let operation = unaryOperators[token].operation;

      let result = operation(firstOperand);

      stack.push(result);
    }
  });

  if (stack.length !== 1) {
    throw Error("Syntax ERROR");
  }

  let ret = stack.pop();

  ret = Number.isInteger(ret) ? ret : parseFloat(ret.toFixed(3));

  return ret;
}