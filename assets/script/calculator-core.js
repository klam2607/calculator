export {binaryOperators, unaryOperators};

const binaryOperators = {
  "+": {
    precedence: 1, 
    associative: "left", 
    operation: (a, b) => a + b, 
  },

  "-": {
    precedence: 1, 
    associative: "left", 
    operation: (a, b) => a - b, 
  },

  "x": {
    precedence: 2, 
    associative: "left", 
    operation: (a, b) => a * b, 
  },

  "/": {
    precedence: 2, 
    associative: "left", 
    operation: (a, b) => a / b, 
  }
};

const unaryOperators = {
  "~": {
    precedence: 3, 
    associative: "left", 
    operation: (a) => -a, 
  }
}