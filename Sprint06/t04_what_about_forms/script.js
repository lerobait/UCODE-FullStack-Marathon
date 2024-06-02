function checkAnswer() {
  const correctAnswer = "pushed";
  const selectedAnswer = document.querySelector(
    'input[name="question"]:checked'
  ).value;
  const resultElement = document.getElementById("result");

  if (selectedAnswer === correctAnswer) {
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Shame on you! Go and watch Avengers!";
  }
}
