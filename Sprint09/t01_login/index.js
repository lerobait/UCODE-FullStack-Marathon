const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require("./models/user");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "abc0526",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "public", "profile.html"));
  } else {
    res.sendFile(path.join(__dirname, "public", "login.html"));
  }
});

app.get("/js/model.js", (req, res) => {
  res.sendFile(path.join(__dirname, "model.js"));
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (user && user.password === password) {
      req.session.user = user;
      res.json({ success: true });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/status", (req, res) => {
  if (req.session.user) {
    res.json({
      role: req.session.user.role,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to log out",
      });
    }
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
});

app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "public", "profile.html"));
  } else {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
