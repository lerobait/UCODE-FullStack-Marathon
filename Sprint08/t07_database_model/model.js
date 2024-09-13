const pool = require("./db");

class Model {
  constructor(attributes = {}) {
    Object.assign(this, attributes);
  }

  static async find(id) {
    const [rows] = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    if (rows.length) {
      return new this(rows[0]);
    }
    return null;
  }

  async delete() {
    if (!this.id) {
      throw new Error("ID is not set.");
    }

    const [result] = await pool.query(
      `DELETE FROM ${this.constructor.tableName} WHERE id = ?`,
      [this.id]
    );
    return result.affectedRows > 0;
  }

  async save() {
    if (this.id) {
      const fields = Object.keys(this).filter((key) => key !== "id");
      const values = fields.map((key) => this[key]);

      const query = `UPDATE ${this.constructor.tableName} SET ${fields
        .map((field) => `${field} = ?`)
        .join(", ")} WHERE id = ?`;
      const [result] = await pool.query(query, [...values, this.id]);

      return result.affectedRows > 0;
    } else {
      // Insert new record
      const fields = Object.keys(this);
      const values = fields.map((key) => this[key]);

      const query = `INSERT INTO ${this.constructor.tableName} (${fields.join(
        ", "
      )}) VALUES (${fields.map(() => "?").join(", ")})`;
      const [result] = await pool.query(query, values);

      this.id = result.insertId;
      return this.id;
    }
  }
}

module.exports = Model;
