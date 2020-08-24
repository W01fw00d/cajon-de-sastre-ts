function validator(expression: string) {
  const validBrackets = ["{", "}", "(", ")", "[", "]", "<", ">"];

  expression = expression
    .split("")
    .filter((char) =>
      validBrackets.some((validBracket) => validBracket === char)
    )
    .reduce((prev, next) => prev + next, "");

  const getBracketsRegExp = (opener: string, closer: string): RegExp =>
    RegExp(`[\\${opener}\\${closer}]{2}`);

  let length: number;
  do {
    length = expression.length;
    expression = expression
      .replace(getBracketsRegExp("{", "}"), "")
      .replace(getBracketsRegExp("(", ")"), "")
      .replace(getBracketsRegExp("[", "]"), "")
      .replace(getBracketsRegExp("<", ">"), "");
  } while (length !== expression.length);

  return expression === "";
}

export default validator;
