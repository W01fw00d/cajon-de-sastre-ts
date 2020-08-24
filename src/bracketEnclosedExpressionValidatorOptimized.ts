function validator(expression: string) {
  expression = expression
    .split("")
    .filter(
      (char) =>
        char == "{" ||
        char == "}" ||
        char == "(" ||
        char == ")" ||
        char == "[" ||
        char == "]" ||
        char == "<" ||
        char == ">"
    )
    .reduce((prev, next) => prev + next, "");

  let length: number;

  do {
    length = expression.length;
    expression = expression
      .replace("{}", "")
      .replace("{{", "")
      .replace("}}", "")
      .replace("}{", "")
      .replace("[]", "")
      .replace("[[", "")
      .replace("]]", "")
      .replace("][", "")
      .replace("()", "")
      .replace("((", "")
      .replace("))", "")
      .replace(")(", "")
      .replace("<>", "")
      .replace("<<", "")
      .replace(">>", "")
      .replace("><", "");
  } while (length !== expression.length);

  return expression === "";
}

export default validator;
