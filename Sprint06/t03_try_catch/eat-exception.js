class EatException extends Error {
  constructor(message = "No more junk food, dumpling.") {
    super(message);
    this.name = "EatException";
  }
}

module.exports = { EatException };
