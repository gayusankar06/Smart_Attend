const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getPrincipalDashboard } = require("../controllers/principalController");

router.get("/dashboard", auth, getPrincipalDashboard);

module.exports = router;
