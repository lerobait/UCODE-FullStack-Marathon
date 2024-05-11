let enteredAnimal = prompt("What animal is the superhero most similar to?", "");
const animalExp = /^[a-zA-Z]{1,20}$/;

if (enteredAnimal === "") {
  alert("Animal name is required.");
  throw "";
} else if (!enteredAnimal.match(animalExp)) {
  alert(
    "The animal's name must not be longer than 20 characters and\nmust contain only letters."
  );
  throw "";
}

let gender = prompt(
  "Is the superhero male or female? Leave blank if unknown or other.",
  ""
);
const genderExp = /^(?:male|female|)$/;

if (gender !== "") {
  if (!gender.match(genderExp)) {
    alert("Gender must be male or female only.");
    throw "";
  }
}

let age = prompt("How old is superhero?", "");
const ageExp = /^[1-9]\d{0,4}$/;

if (age === "") {
  alert("Superhero age is required.");
  throw "";
} else if (!age.match(ageExp)) {
  alert(
    "The superhero age must not be longer than 5 characters,\ncannot start from zero and must contain only digits."
  );
  throw "";
}

let description;

if (gender === "") {
  if (age < 18) {
    description = "kid";
  } else {
    description = "hero";
  }
} else if (gender === "male") {
  if (age < 18) {
    description = "boy";
  } else {
    description = "man";
  }
} else {
  if (age < 18) {
    description = "girl";
  } else {
    description = "woman";
  }
}

alert(`The superhero name is: ${enteredAnimal}-${description}`);
