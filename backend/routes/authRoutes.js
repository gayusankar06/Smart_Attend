const express = require("express");
const router = express.Router();

const { login, logout } = require("../controllers/authController");

// SAFETY LOG (REMOVE LATER)
console.log("login:", typeof login);
console.log("logout:", typeof logout);

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
