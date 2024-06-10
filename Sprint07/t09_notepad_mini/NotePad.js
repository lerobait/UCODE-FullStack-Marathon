const fs = require("fs");
const Note = require("./Note");

class NotePad {
  constructor() {
    this.notes = [];
  }

  addNote(name, importance, content, date) {
    const note = new Note(name, importance, content, date);
    this.notes.push(note);
    this.saveNotes();
  }

  deleteNote(index) {
    this.notes.splice(index, 1);
    this.saveNotes();
  }

  saveNotes() {
    fs.writeFile("notes.json", JSON.stringify(this.notes, null, 2), (err) => {
      if (err) throw err;
      console.log("Notes saved successfully!");
    });
  }

  loadNotes(callback) {
    fs.readFile("notes.json", "utf8", (err, data) => {
      if (err) {
        console.log("No notes found.");
        this.notes = [];
      } else {
        this.notes = JSON.parse(data);
      }
      callback();
    });
  }
}

module.exports = NotePad;
