const fs = require("fs");
const File = require("./File");

class FileList {
  constructor(dir = "tmp") {
    this.dir = dir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

  getFiles() {
    return fs.readdirSync(this.dir).map((filename) => {
      const file = new File(filename, this.dir);
      return { filename, content: file.read() };
    });
  }

  createFile(filename, content) {
    const file = new File(filename, this.dir);
    file.write(content);
  }

  deleteFile(filename) {
    const file = new File(filename, this.dir);
    file.delete();
  }

  getList() {
    return fs.readdirSync("./tmp");
  }

  hasFiles() {
    return fs.existsSync("./tmp");
  }

  getHTMLList() {
    let list = fs.readdirSync("./tmp");
    let strHTML = "<ul>";
    for (let i = 0; i < list.length; i++) {
      strHTML += `<li><a href="/select-file?file=${list[i]}">${list[i]}</a></li>`;
    }
    strHTML += "</ul>";
    return strHTML;
  }
}

module.exports = FileList;
