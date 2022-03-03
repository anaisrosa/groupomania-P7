const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userController");

// Create a new Account
router.post("/signup", userCtrl.signup);

// Create login whith an acount
router.post("/login", userCtrl.login);

// Find one account
router.get("/account/:id", userCtrl.findOneAccount);

// Compare two passwords
// router.get("/verify-password", userCtrl.comparePassword);
router.post("/verify-password", userCtrl.comparePassword);

// Modify an account
router.post("/modify-account/:id", userCtrl.updateAccount);

module.exports = router;
