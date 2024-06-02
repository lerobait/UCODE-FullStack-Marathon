class Avenger {
  constructor({ name, alias, gender, age, powers }) {
    this.name = name;
    this.alias = alias;
    this.gender = gender;
    this.age = age;
    this.powers = powers;
  }

  invokePowers() {
    return `${this.alias.toUpperCase()}\n${this.powers.join("\n")}`;
  }

  toString() {
    return `name: ${this.name}\ngender: ${this.gender}\nage: ${this.age}`;
  }
}

function createAvenger(props) {
  const avenger = new Avenger(props);

  const callTheAvenger = function () {
    return avenger.invokePowers();
  };

  callTheAvenger.toString = function () {
    return avenger.toString();
  };

  return callTheAvenger;
}

module.exports = { Avenger: createAvenger };
