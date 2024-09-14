const pool = require("../db");

class User {
  constructor(name, username, email, password) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    const sql = `
      INSERT INTO users (name, username, email, password) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [this.name, this.username, this.email, this.password];
    const [result] = await pool.execute(sql, values);
    return result;
  }
}

module.exports = User;
