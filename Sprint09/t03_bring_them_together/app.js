const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/js", express.static(path.join(__dirname, "")));

app.use(
  session({
    secret: "abc0526",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
