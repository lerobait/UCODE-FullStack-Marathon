class Human {
  constructor() {
    this.firstName = prompt("Enter your first name");
    this.lastName = prompt("Enter your last name");
    this.gender = prompt("Enter your gender");
    this.age = prompt("Enter your age");
    this.calories = 400;
    this.sleepTime = false;
    this.updateDOM();
    setInterval(() => this.hungry(), 60000);
  }

  updateDOM() {
    document.getElementById("firstName").innerHTML = this.firstName;
    document.getElementById("lastName").innerHTML = this.lastName;
    document.getElementById("gender").innerHTML = this.gender;
    document.getElementById("age").innerHTML = this.age;
    document.getElementById("calories").innerHTML = this.calories;
  }

  sleepFor(sleep_seconds) {
    if (!this.sleepTime) {
      this.sleepTime = true;
      this.updateStatus("I'm sleeping", "assets/images/sleeping.jpg");
      this.disableButtons(true);
      setTimeout(() => {
        this.updateStatus("I'm awake now", "assets/images/human.jpg");
        this.sleepTime = false;
        this.disableButtons(false);
        setTimeout(() => {
          this.updateStatus("I'm Human", "assets/images/human.jpg");
        }, 5000);
      }, sleep_seconds * 1000);
    }
  }

  feed() {
    if (this.calories < 500) {
      this.disableButtons(true);
      this.updateStatus("Nom nom nom", "assets/images/eating.jpg");
      setTimeout(() => {
        this.calories += 200;
        this.updateDOM();
        this.updateStatus("I'm Human", "assets/images/human.jpg");
        if (this.calories < 500) {
          this.updateStatus("I'm still hungry", "assets/images/human.jpg");
          setTimeout(() => {
            this.updateStatus("I'm Human", "assets/images/human.jpg");
          }, 2000);
        }
        this.disableButtons(false);
      }, 10000);
    } else {
      this.updateStatus("I'm not hungry", "assets/images/human.jpg");
      setTimeout(() => {
        this.updateStatus("I'm Human", "assets/images/human.jpg");
      }, 2000);
    }
  }

  hungry() {
    this.calories -= 200;
    this.updateDOM();
  }

  updateStatus(status, imgSrc) {
    document.querySelector(".title h1").innerHTML = status;
    document.querySelector(".image-container img").src = imgSrc;
  }

  disableButtons(disable) {
    let buttons = document.querySelectorAll(".button-container button");
    buttons.forEach((button) => {
      button.disabled = disable;
    });
  }
}

class Superhero extends Human {
  constructor(firstName, lastName, gender, age, calories) {
    super(firstName, lastName, gender, age, calories);
    this.isSuperhero = false;
  }

  turnInSuperhero() {
    if (this.calories > 500) {
      this.isSuperhero = true;
      this.updateStatus("Black Panther", "assets/images/hero.jpg");
    } else {
      this.updateStatus("I'm still hungry", "assets/images/human.jpg");
      setTimeout(() => {
        this.updateStatus("I'm Human", "assets/images/human.jpg");
      }, 2000);
    }
  }

  fly() {
    if (this.isSuperhero) {
      this.disableButtons(true);
      this.updateStatus("I'm flying!", "assets/images/flying.jpg");
      setTimeout(() => {
        this.updateStatus("Black Panther", "assets/images/hero.jpg");
        this.disableButtons(false);
      }, 10000);
    }
  }

  fightWithEvil() {
    if (this.isSuperhero) {
      this.disableButtons(true);
      this.updateStatus(
        "Khhhh-chh... Bang-g-g-g... Evil is defeated!",
        "assets/images/fighting.jpg"
      );
      setTimeout(() => {
        this.updateStatus("Black Panther", "assets/images/hero.jpg");
        this.disableButtons(false);
      }, 10000);
    }
  }
}

const human = new Superhero();
document.querySelector("#sleep").addEventListener("click", (event) => {
  let sleep_seconds = prompt("Enter sleep time");
  if (sleep_seconds) {
    human.sleepFor(sleep_seconds);
  }
});
document.querySelector("#feed").addEventListener("click", (event) => {
  human.feed();
});
document.querySelector("#hero").addEventListener("click", (event) => {
  human.turnInSuperhero();
});
document.querySelector("#fly").addEventListener("click", (event) => {
  human.fly();
});
document.querySelector("#fight").addEventListener("click", (event) => {
  human.fightWithEvil();
});
