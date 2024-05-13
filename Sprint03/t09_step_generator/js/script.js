function* numberGenerator() {
  let previousResult = 1;
  while (true) {
    let input = prompt(
      `Previous result: ${previousResult}. Enter a new number:`
    );
    let number = Number(input);
    if (isNaN(number)) {
      console.log("Invalid number!");
      continue;
    }
    previousResult += number;
    if (previousResult > 10000) {
      previousResult = 1;
    }
    yield previousResult;
  }
}

let generator = numberGenerator();
console.log(generator.next().value);
console.log(generator.next().value);
