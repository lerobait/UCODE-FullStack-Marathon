const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

router.get("/", controllers.getHomePage);
router.get("/register", controllers.getRegisterPage);
router.post("/register", controllers.registerUser);
router.get("/login", controllers.getLoginPage);
router.post("/login", controllers.loginUser);
router.get("/reminder", controllers.getReminderPage);
router.get("/get-email", controllers.getEmail);
router.post("/send-password", controllers.sendPassword);
router.get("/status", controllers.getStatus);
router.post("/logout", controllers.logoutUser);
router.get("/profile", controllers.getHomePage);

module.exports = router;
