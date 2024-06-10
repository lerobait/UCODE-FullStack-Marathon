const express = require("express");
const csv = require("csv-parser");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const app = express();

const config = {
  host: "localhost",
  port: 3000,
  uploadDir: "./",
  fileName: "invalid-name",
};

app.use(express.static(path.join(__dirname, "")));

app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = config.uploadDir;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }

    const filePath = path.join(config.uploadDir, config.fileName);

    let results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        res.json(results);
      });
  });
});

app.listen(config.port, config.host, () =>
  console.log(`Server is listening on http://${config.host}:${config.port}`)
);
