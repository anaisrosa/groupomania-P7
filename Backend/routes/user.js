const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userController");

// Create a new User Account
router.post("/signup", userCtrl.signup);

// Login whith a User account
router.post("/login", userCtrl.login);

// Find one User account
router.get("/account/:id", auth.userCheck, userCtrl.findOneAccount);

// Compare two passwords
router.post("/verify-password", auth.userCheck, userCtrl.comparePassword);

// Modify a User account
router.post("/modify-account/:id", auth.userCheck, userCtrl.updateAccount);

module.exports = router;