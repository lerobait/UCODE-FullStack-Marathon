const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

const app = express();

const host = "localhost";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "")));

let savedPassword = null;
let savedSalt = null;

app.post("/save", (req, res) => {
  const { password, salt } = req.body;
  if (password && salt) {
    savedPassword = hashPassword(password, salt);
    savedSalt = salt;
    res.sendStatus(200);
  } else {
    res.status(400).send("Bad request");
  }
});

app.post("/guess", (req, res) => {
  const { guess } = req.body;
  if (guess && savedPassword && savedSalt) {
    const hashedGuess = hashPassword(guess, savedSalt);
    if (hashedGuess === savedPassword) {
      savedPassword = null;
      savedSalt = null;
      res.send("Hacked!");
    } else {
      res.status(403).send("Access denied!");
    }
  } else {
    res.status(400).send("Bad request");
  }
});

app.post("/clear", (req, res) => {
  savedPassword = null;
  savedSalt = null;
  res.sendStatus(200);
});

const hashPassword = (password, salt) => {
  return CryptoJS.SHA256(password + salt).toString(CryptoJS.enc.Hex);
};

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
