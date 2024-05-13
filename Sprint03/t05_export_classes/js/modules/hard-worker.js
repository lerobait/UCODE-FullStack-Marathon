class HardWorker {
  constructor() {
    this._name = null;
    this._age = null;
    this._salary = null;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (1 > value || value >= 100) {
      return;
    }
    this._age = value;
  }

  get salary() {
    return this._salary;
  }

  set salary(value) {
    if (100 > value || value >= 10000) {
      return;
    }
    this._salary = value;
  }

  toObject() {
    return {
      name: this.name,
      age: this.age,
      salary: this.salary,
    };
  }
}

export default HardWorker;
