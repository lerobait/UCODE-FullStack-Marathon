const checkBrackets = (str) => {
  if (typeof str !== "string" || (!str.includes("(") && !str.includes(")"))) {
    return -1;
  }

  let openBrackets = 0;
  let closeBrackets = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(") {
      openBrackets++;
    } else if (str[i] === ")") {
      if (openBrackets > 0) {
        openBrackets--;
      } else {
        closeBrackets++;
      }
    }
  }
  return openBrackets + closeBrackets;
};
