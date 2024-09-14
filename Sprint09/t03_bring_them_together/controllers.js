const path = require("path");
const User = require("./models/user");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 25,
  auth: {
    user: "e52cc08c4eca6a",
    pass: "ff82fef28f0b16",
  },
});

exports.getHomePage = (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "views", "profile.html"));
  } else {
    res.sendFile(path.join(__dirname, "views", "login.html"));
  }
};

exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
};

exports.registerUser = async (req, res) => {
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
};

exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
};

exports.loginUser = async (req, res) => {
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
};

exports.getReminderPage = (req, res) => {
  const email = req.query.email;
  if (email) {
    res.sendFile(path.join(__dirname, "views", "reminder.html"));
  } else {
    res.redirect("/");
  }
};

exports.getEmail = async (req, res) => {
  const username = req.query.username;
  if (username) {
    try {
      const user = await User.findByUsername(username);
      if (user) {
        res.json({ success: true, email: user.email });
      } else {
        res.json({ success: false, message: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false, message: "Username is required" });
  }
};

exports.sendPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const mailOptions = {
      from: "artem.nikulin.0526@gmail.com",
      to: email,
      subject: "Your Password Reminder",
      text: `Your password is: ${user.password}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Password sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getStatus = (req, res) => {
  if (req.session.user) {
    res.json({ role: req.session.user.role });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to log out" });
    }
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};
