const express = require("express");
const { quotesList, newQuotesList } = require("./index");
const path = require("path");
const fs = require("fs");

const app = express();

const host = "localhost";
const port = 3000;

app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/data", (req, res) => {
  const xmlContent = fs.readFileSync("avenger_quotes.xml", "utf-8");
  res.json({
    before: quotesList.quotes,
    after: newQuotesList.quotes,
    xml: xmlContent,
  });
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
