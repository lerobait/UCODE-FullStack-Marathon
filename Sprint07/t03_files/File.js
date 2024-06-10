const fs = require("fs");
const path = require("path");

class File {
  constructor(filename, dir = "tmp") {
    this.path = path.join(dir, filename);
  }

  write(content) {
    fs.appendFileSync(this.path, content);
  }

  read() {
    return fs.readFileSync(this.path, "utf-8");
  }

  delete() {
    fs.unlinkSync(this.path);
  }

  exists() {
    return fs.existsSync(this.path);
  }
}

module.exports = File;
