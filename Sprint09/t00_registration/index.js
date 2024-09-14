const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/js/model.js", (req, res) => {
  res.sendFile(path.join(__dirname, "model.js"));
});

app.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = new User(name, username, email, password);
    await user.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    } else {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
