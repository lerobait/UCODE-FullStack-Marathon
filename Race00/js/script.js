document.addEventListener("DOMContentLoaded", (event) => {
  const currentExpressionElement =
    document.getElementById("current-expression");
  const lastExpressionElement = document.getElementById("last-expression");
  const buttons = document.querySelectorAll(".number, .operator, .bracket");
  const equalsButton = document.getElementById("equals");
  const bracketButton = document.getElementById("brackets");
  const memoryRecallButton = document.getElementById("memory-recall");
  const memoryClearButton = document.getElementById("memory-clear");
  const memoryPlusButton = document.getElementById("memory-plus");
  const memoryMinusButton = document.getElementById("memory-minus");
  const squareRootButton = document.getElementById("square-root");
  const exponentiationButton = document.getElementById("exponentiation");
  const factorialButton = document.getElementById("factorial");
  const piButton = document.getElementById("pi");
  const millimeterButton = document.getElementById("millimeter");
  const centimeterButton = document.getElementById("centimeter");
  const meterButton = document.getElementById("meter");
  const kilometerButton = document.getElementById("kilometer");
  const milligramButton = document.getElementById("milligram");
  const gramButton = document.getElementById("gram");
  const kilogramButton = document.getElementById("kilogram");
  const tonButton = document.getElementById("ton");

  let memoryValue = 0;

  const adjustFontSize = () => {
    const containerWidth = currentExpressionElement.parentElement.offsetWidth;
    let fontSize = 50;
    currentExpressionElement.style.fontSize = fontSize + "px";

    while (
      currentExpressionElement.scrollWidth > containerWidth &&
      fontSize > 10
    ) {
      fontSize -= 1;
      currentExpressionElement.style.fontSize = fontSize + "px";
    }
  };

  memoryRecallButton.addEventListener("click", () => {
    memoryValue = parseFloat(currentExpressionElement.innerText);
    lastExpressionElement.innerText = `MR is ${memoryValue}`;
    adjustFontSize();
  });

  memoryClearButton.addEventListener("click", () => {
    memoryValue = 0;
    lastExpressionElement.innerText = "MR is cleared";
    adjustFontSize();
  });

  memoryPlusButton.addEventListener("click", () => {
    const currentValue = parseFloat(currentExpressionElement.innerText);
    if (!isNaN(currentValue)) {
      const newValue = currentValue + memoryValue;
      currentExpressionElement.innerText = newValue.toString();
      lastExpressionElement.innerText = `${currentValue} + ${memoryValue}`;
      adjustFontSize();
    }
  });

  memoryMinusButton.addEventListener("click", () => {
    const currentValue = parseFloat(currentExpressionElement.innerText);
    if (!isNaN(currentValue)) {
      const newValue = currentValue - memoryValue;
      currentExpressionElement.innerText = newValue.toString();
      lastExpressionElement.innerText = `${currentValue} - ${memoryValue}`;
      adjustFontSize();
    }
  });

  let openBracketsCount = 0;

  const isOperator = (char) => {
    return ["+", "-", "×", "÷", "%"].includes(char);
  };

  const isNumber = (char) => {
    return /\d/.test(char);
  };

  const endsWithOperator = (expression) => {
    return isOperator(expression.slice(-1));
  };

  const endsWithBracket = (expression) => {
    return ["(", ")"].includes(expression.slice(-1));
  };

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonValue = e.target.innerText;
      let currentExpression = currentExpressionElement.innerText;

      if (buttonValue !== "()") {
        if (currentExpression === "0" || currentExpression === "") {
          if (isNumber(buttonValue)) {
            currentExpressionElement.innerText = buttonValue;
          } else if (buttonValue === "-" && currentExpression !== "-") {
            currentExpressionElement.innerText = buttonValue;
          }
        } else if (isOperator(buttonValue)) {
          if (
            !endsWithOperator(currentExpression) &&
            !endsWithBracket(currentExpression)
          ) {
            currentExpressionElement.innerText += buttonValue;
          } else if (
            endsWithBracket(currentExpression) &&
            currentExpression.slice(-1) === ")"
          ) {
            currentExpressionElement.innerText += buttonValue;
          }
        } else {
          currentExpressionElement.innerText += buttonValue;
        }
        adjustFontSize();
      }
    });
  });

  bracketButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    if (currentExpression === "0" || currentExpression === "") {
      currentExpressionElement.innerText = "(";
      openBracketsCount++;
    } else if (openBracketsCount === 0 || endsWithOperator(currentExpression)) {
      currentExpressionElement.innerText += "(";
      openBracketsCount++;
    } else if (openBracketsCount > 0 && !endsWithOperator(currentExpression)) {
      currentExpressionElement.innerText += ")";
      openBracketsCount--;
    }
    adjustFontSize();
  });

  const evaluateExpression = (expr) => {
    expr = expr
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/%/g, "/100")
      .replace(/π/g, Math.PI);

    const evaluateExponentiation = (exp) => {
      const regex = /(-?\d+(\.\d+)?|\([^()]+\))\^(-?\d+(\.\d+)?|\([^()]+\))/g;
      while (regex.test(exp)) {
        exp = exp.replace(regex, (match, base, _, exponent) => {
          const baseValue = eval(evaluateExpression(base));
          const exponentValue = eval(evaluateExpression(exponent));
          return Math.pow(baseValue, exponentValue);
        });
      }
      return exp;
    };

    const evaluateBrackets = (exp) => {
      const regex = /\(([^()]+)\)/g;
      while (regex.test(exp)) {
        exp = exp.replace(regex, (match, subExp) =>
          eval(evaluateExpression(subExp))
        );
      }
      return exp;
    };

    return eval(evaluateExponentiation(evaluateBrackets(expr)));
  };

  equalsButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    while (openBracketsCount > 0) {
      currentExpression += ")";
      openBracketsCount--;
    }

    try {
      const result = evaluateExpression(currentExpression);
      lastExpressionElement.innerText = currentExpression;
      currentExpressionElement.innerText = result;
      adjustFontSize();
    } catch (error) {
      currentExpressionElement.innerText = "Error!";
    }
  });

  const deleteButton = document.getElementById("delete");
  deleteButton.addEventListener("click", () => {
    let expression = currentExpressionElement.innerText;
    if (expression.endsWith("(")) {
      openBracketsCount--;
    } else if (expression.endsWith(")")) {
      openBracketsCount++;
    }
    currentExpressionElement.innerText = expression.slice(0, -1) || "0";
    adjustFontSize();
  });

  const allClearButton = document.getElementById("all-clear");
  allClearButton.addEventListener("click", () => {
    currentExpressionElement.innerText = "0";
    openBracketsCount = 0;
    adjustFontSize();
  });

  const dropdownButton = document.getElementById("dropdown");
  const extraFunctionsDropdown = document.getElementById(
    "extra-functions-dropdown"
  );

  dropdownButton.addEventListener("click", () => {
    if (
      extraFunctionsDropdown.style.display === "none" ||
      extraFunctionsDropdown.style.display === ""
    ) {
      extraFunctionsDropdown.style.display = "flex";
      dropdownButton.innerHTML = "&#129053;";
    } else {
      extraFunctionsDropdown.style.display = "none";
      dropdownButton.innerHTML = "&#129055;";
    }
  });

  squareRootButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);

    if (!isNaN(currentValue) && currentValue >= 0) {
      let result = Math.sqrt(currentValue);
      lastExpressionElement.innerText = `√${currentValue}`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  exponentiationButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    if (
      currentExpression !== "0" &&
      !endsWithOperator(currentExpression) &&
      !currentExpression.endsWith("^")
    ) {
      currentExpressionElement.innerText += "^";
      adjustFontSize();
    }
  });

  factorialButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);

    if (!isNaN(currentValue) && currentValue >= 0) {
      let result = math.factorial(currentValue);
      lastExpressionElement.innerText = `${currentValue}!`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  piButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;

    if (currentExpression === "0") {
      currentExpressionElement.innerText = "π";
    } else if (
      !endsWithOperator(currentExpression) &&
      !currentExpression.endsWith("(")
    ) {
      currentExpressionElement.innerText += "×π";
    } else {
      currentExpressionElement.innerText += "π";
    }
    adjustFontSize();
  });

  const convertToMillimeters = (value) => {
    return value * 1000;
  };

  const convertToCentimeters = (value) => {
    return value * 100;
  };

  const convertToMeters = (value) => {
    return value;
  };

  const convertToKilometers = (value) => {
    return value / 1000;
  };

  millimeterButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);

    if (!isNaN(currentValue)) {
      let result = convertToMillimeters(currentValue);
      lastExpressionElement.innerText = `${currentValue} m to mm`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  centimeterButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);

    if (!isNaN(currentValue)) {
      let result = convertToCentimeters(currentValue);
      lastExpressionElement.innerText = `${currentValue} m to cm`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  meterButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);

    if (!isNaN(currentValue)) {
      let result = convertToMeters(currentValue);
      lastExpressionElement.innerText = `${currentValue} m`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  kilometerButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);

    if (!isNaN(currentValue)) {
      let result = convertToKilometers(currentValue);
      lastExpressionElement.innerText = `${currentValue} m to km`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  const convertToMilligrams = (value) => {
    return value * 1000000;
  };

  const convertToGrams = (value) => {
    return value * 1000;
  };

  const convertToKilograms = (value) => {
    return value;
  };

  const convertToTons = (value) => {
    return value / 1000;
  };

  milligramButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);
    if (!isNaN(currentValue)) {
      let result = convertToMilligrams(currentValue);
      lastExpressionElement.innerText = `${currentValue} kg to mg`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  gramButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);
    if (!isNaN(currentValue)) {
      let result = convertToGrams(currentValue);
      lastExpressionElement.innerText = `${currentValue} kg to gm`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  kilogramButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);
    if (!isNaN(currentValue)) {
      let result = convertToKilograms(currentValue);
      lastExpressionElement.innerText = `${currentValue} kg`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });

  tonButton.addEventListener("click", () => {
    let currentExpression = currentExpressionElement.innerText;
    let currentValue = parseFloat(currentExpression);
    if (!isNaN(currentValue)) {
      let result = convertToTons(currentValue);
      lastExpressionElement.innerText = `${currentValue} kg to tn`;
      currentExpressionElement.innerText = result;
    } else {
      currentExpressionElement.innerText = "Error!";
    }
    adjustFontSize();
  });
});
