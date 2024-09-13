const Model = require("../model");

class Hero extends Model {
  constructor(attributes = {}) {
    super(attributes);
  }

  static get tableName() {
    return "heroes";
  }
}

module.exports = Hero;
