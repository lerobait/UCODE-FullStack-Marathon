const express = require("express");
const bodyParser = require("body-parser");
const iconv = require("iconv-lite");
const path = require("path");

const app = express();

const host = "localhost";
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "")));

app.post("/convert", (req, res) => {
  const { inputString, selectCharset } = req.body;

  const result = {
    inputString,
    utf: selectCharset.includes("utf")
      ? iconv.encode(inputString, "utf8").toString()
      : "",
    iso: selectCharset.includes("iso-8859-1")
      ? iconv.encode(inputString, "iso-8859-1").toString()
      : "",
    windows: selectCharset.includes("cp1252")
      ? iconv.encode(inputString, "cp1252").toString()
      : "",
  };

  res.json(result);
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
