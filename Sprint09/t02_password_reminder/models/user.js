const pool = require("../db");

class User {
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
