class Note {
  constructor(name, importance, content, date) {
    this.name = name;
    this.importance = importance;
    this.content = content;
    this.date = date;
  }

  toJSON() {
    return {
      name: this.name,
      importance: this.importance,
      content: this.content,
      date: this.date,
    };
  }
}

module.exports = Note;
