const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const host = "localhost";
const port = 3000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/count", (req, res) => {
  const currentTime = Date.now();
  const oneMinute = 60000;

  let loadTimes = req.cookies.loadTimes
    ? JSON.parse(req.cookies.loadTimes)
    : [];

  loadTimes = loadTimes.filter((time) => currentTime - time < oneMinute);

  loadTimes.push(currentTime);

  res.cookie("loadTimes", JSON.stringify(loadTimes), { maxAge: oneMinute });

  res.json({ count: loadTimes.length });
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
