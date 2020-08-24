//fails for expression = {([{(O)}]){}[([]Lql[2])]
function validator(expression: string) {
  console.error("Starting expression", expression);

  const validOpenerBrackets = ["(", "[", "{"];
  const validCloserBrackets = [")", "]", "}"];
  const openerBrackets = {
    parenthes: "(",
    square: "[",
    curly: "{",
  };
  const closerBrackets = {
    parenthes: ")",
    square: "]",
    curly: "}",
  };

  const getKeyByValue = (object: any, value: any): string | undefined =>
    Object.keys(object).find((key) => object[key] === value);

  let currentBracket: string | undefined;

  let shallIterate = false;
  let result = true;

  while (expression.length > 0 && result) {
    shallIterate = true;
    let forwardIterator: number = 0;

    for (
      forwardIterator = 0;
      forwardIterator < expression.length && shallIterate;
      forwardIterator++
    ) {
      let currentChar: string | undefined = expression.charAt(forwardIterator);
      let backwardIterator: number | undefined;

      if (
        validCloserBrackets.find((validBracket) => currentChar === validBracket)
      ) {
        currentBracket = getKeyByValue(closerBrackets, currentChar);

        for (
          backwardIterator = forwardIterator - 1;
          backwardIterator >= 0 && shallIterate;
          backwardIterator--
        ) {
          currentChar = expression.charAt(backwardIterator);
          if (
            validOpenerBrackets.find(
              (validBracket) => currentChar === validBracket
            ) &&
            getKeyByValue(openerBrackets, currentChar) === currentBracket
          ) {
            const slicer = () =>
              expression.slice(0, backwardIterator) +
              expression.slice(forwardIterator + 1, expression.length);

            console.error(
              "backwardIterator",
              backwardIterator,
              "forwardIterator",
              forwardIterator,
              "New expression: ",
              slicer()
            );
            expression = slicer();
            shallIterate = false;
          }
        }

        //If no opener bracket has been found...
        if (backwardIterator === -1 && expression.length > 0) {
          console.error("Result is FALSE");
          result = false;
          shallIterate = false;
        }
      }
    }

    //If no closer bracket has been found...
    if (expression.length > 0 && forwardIterator === expression.length) {
      let currentChar = expression.charAt(forwardIterator);
      let backwardIterator: number | undefined;

      for (
        backwardIterator = forwardIterator - 1;
        backwardIterator >= 0 && shallIterate;
        backwardIterator--
      ) {
        currentChar = expression.charAt(backwardIterator);
        // But a lonely opener bracket is found...
        if (
          validOpenerBrackets.find(
            (validBracket) => currentChar === validBracket
          )
        ) {
          console.error("Result is FALSE");
          result = false;
          shallIterate = false;
        }
      }

      //And no opener bracket has been found...
      if (backwardIterator === -1) {
        // Remaining chars are not brackets, so we can ignore
        expression = "";
      }
    }
  }

  return result;
}

export default validator;
