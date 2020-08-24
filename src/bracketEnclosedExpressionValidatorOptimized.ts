function validator(expression: string) {
  const validBrackets = ["{", "}", "(", ")", "[", "]", "<", ">"];

  expression = expression
    .split("")
    .filter((char) =>
      validBrackets.some((validBracket) => validBracket === char)
    )
    .reduce((prev, next) => prev + next, "");

  let length: number;

  do {
    length = expression.length;
    expression = expression
      .replace(/[\{\}]{2}/g, "")
      .replace(/[\[\]]{2}/g, "")
      .replace(/[\(\)]{2}/g, "")
      .replace(/[\<\>]{2}/g, "");
  } while (length !== expression.length);

  return expression === "";
}

export default validator;
