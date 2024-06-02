const { LLData } = require("./LLData");

class LList {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  getFirst() {
    return this.start;
  }

  getLast() {
    return this.end;
  }

  add(value) {
    const newNode = new LLData(value);
    if (!this.start) {
      this.start = newNode;
      this.end = newNode;
    } else {
      this.end.next = newNode;
      this.end = newNode;
    }
    this.size++;
  }

  addFromArray(arrayOfData) {
    arrayOfData.forEach((value) => this.add(value));
  }

  remove(value) {
    if (!this.start) return;

    if (this.start.data === value) {
      this.start = this.start.next;
      if (!this.start) {
        this.end = null;
      }
      this.size--;
      return;
    }

    let current = this.start;
    while (current.next && current.next.data !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      if (!current.next) {
        this.end = current;
      }
      this.size--;
    }
  }

  removeAll(value) {
    while (this.start && this.start.data === value) {
      this.start = this.start.next;
      this.size--;
    }

    if (!this.start) {
      this.end = null;
      return;
    }

    let current = this.start;
    while (current.next) {
      if (current.next.data === value) {
        current.next = current.next.next;
        this.size--;
      } else {
        current = current.next;
      }
    }

    if (!current.next) {
      this.end = current;
    }
  }

  contains(value) {
    let current = this.start;
    while (current) {
      if (current.data === value) return true;
      current = current.next;
    }
    return false;
  }

  clear() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  count() {
    return this.size;
  }

  toString() {
    let result = "";
    let current = this.start;
    while (current) {
      result += current.data + (current.next ? ", " : "");
      current = current.next;
    }
    return result;
  }

  filter(callback) {
    const newList = new LList();
    let current = this.start;
    while (current) {
      if (callback(current.data)) {
        newList.add(current.data);
      }
      current = current.next;
    }
    return newList;
  }

  *[Symbol.iterator]() {
    let current = this.start;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }
}

module.exports = { LList };
