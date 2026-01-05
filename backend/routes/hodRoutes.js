const express = require("express");
const router = express.Router();

const {
  getHodDashboard,
  counselStudent,
} = require("../controllers/hodController");

// SAFETY LOG (REMOVE LATER)
console.log("getHodDashboard:", typeof getHodDashboard);
console.log("counselStudent:", typeof counselStudent);

router.get("/dashboard", getHodDashboard);
router.post("/counsel", counselStudent);

module.exports = router;
