const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

const host = "localhost";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "1234", resave: false, saveUninitialized: true }));

app.get("/", (req, res) => {
  if (req.session.data) {
    const data = req.session.data;
    const formattedData = `
      name : ${data["real-name"]}
      alias : ${data["current-alias"]}
      age : ${data.age}
      description : ${data.about}
      photo : ${data.photo}
      level : ${data["level-of-control"]}
      experience : ${data.experience}
      purpose : ${data.purpose}
    `;
    res.send(`
      <h1>About HERO</h1>
      <pre>${formattedData}</pre>
      <form method="POST" action="/forget">
        <button type="submit">FORGET</button>
      </form>
    `);
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/", (req, res) => {
  const data = req.body;

  const powers = [
    "strength",
    "speed",
    "intelligance",
    "teleportation",
    "immortal",
    "another",
  ];
  let experience = 0;
  for (let power of powers) {
    if (data[power]) {
      experience++;
    }
  }

  const publicities = [
    "unknown",
    "like-a-ghost",
    "i-am-in-comics",
    "i-have-fun-club",
    "superstar",
  ];
  let purpose = 0;
  for (let publicity of publicities) {
    if (data[publicity]) {
      purpose++;
    }
  }

  req.session.data = {
    ...data,
    experience: experience,
    purpose: purpose,
  };

  res.redirect("/");
});

app.post("/forget", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
