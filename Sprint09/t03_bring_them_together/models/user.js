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

  static async findByUsername(username) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    const [rows] = await pool.execute(sql, [username]);
    return rows[0];
  }
  static async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await pool.execute(sql, [email]);
    return rows[0];
  }
}

module.exports = User;
