const { Avenger } = require("./Avenger");

class Team {
  constructor(id, avengers) {
    this.id = id;
    this.avengers = avengers;
  }

  clone() {
    const avengersClone = this.avengers.map((avenger) => {
      return new Avenger(
        avenger.name,
        avenger.alias,
        avenger.gender,
        avenger.age,
        avenger.powers,
        avenger.hp
      );
    });
    return new Team(this.id, avengersClone);
  }

  battle(damage) {
    const { damage: damageValue } = damage;
    this.avengers.forEach((avenger) => {
      avenger.hp -= damageValue;
    });
    this.avengers = this.avengers.filter((avenger) => avenger.hp > 0);
  }

  calculateLosses(clonedTeam) {
    const lostCount = clonedTeam.avengers.length - this.avengers.length;
    if (lostCount === 0) {
      console.log("We haven't lost anyone in this battle!");
    } else {
      console.log(
        `In this battle we lost ${lostCount} Avenger${
          lostCount > 1 ? "s" : ""
        }.`
      );
    }
  }
}

module.exports = { Team };
