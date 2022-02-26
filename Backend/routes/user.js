const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/account/:id", userCtrl.findOneAccount);
router.get("/verify-password", userCtrl.comparePassword);
router.post("/modify-account/:id", userCtrl.updateAccount);

module.exports = router;
