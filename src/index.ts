import validator from "./bracketEnclosedExpressionValidatorOptimized";

// let expression: string = readline();
let expression = "{([{(O)}]){}[([]Lql[2])]";
console.log(validator(expression));
