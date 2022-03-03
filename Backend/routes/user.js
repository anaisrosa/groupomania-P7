const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userController");

// Create a new Account
router.post("/signup", userCtrl.signup);

// Create login whith an acount
router.post("/login", userCtrl.login);

// Find one account
router.get("/account/:id", auth.userCheck, userCtrl.findOneAccount);

// Compare two passwords
router.post("/verify-password", auth.userCheck, userCtrl.comparePassword);

// Modify an account
router.post("/modify-account/:id", auth.userCheck, userCtrl.updateAccount);

module.exports = router;
