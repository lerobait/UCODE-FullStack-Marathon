const characters = document.getElementById("characters").children;
const validClasses = ["good", "evil", "unknown"];
const validElements = ["air", "water", "earth", "fire"];

for (let character of characters) {
  let characterClass = character.getAttribute("class");
  if (!characterClass || !validClasses.includes(characterClass)) {
    character.setAttribute("class", "unknown");
  }

  let characterElement = character.getAttribute("data-element");
  if (!characterElement) {
    character.setAttribute("data-element", "none");
  }

  let circleContainer = document.createElement("div");
  circleContainer.style.display = "flex";
  circleContainer.style.justifyContent = "center";
  character.appendChild(circleContainer);

  let elements = character.getAttribute("data-element").split(" ");
  for (let element of elements) {
    let circle = document.createElement("div");
    circle.classList.add("elem");

    if (validElements.includes(element)) {
      circle.classList.add(element);
    } else {
      circle.classList.add("none");
      let line = document.createElement("div");
      line.classList.add("line");
      circle.appendChild(line);
    }

    circleContainer.appendChild(circle);
  }
}
