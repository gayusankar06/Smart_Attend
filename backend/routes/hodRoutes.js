const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware"); // ✅ THIS WAS MISSING

const {
  getHodDashboard,
  counselStudent,
} = require("../controllers/hodController");

// HOD protected routes
router.get("/dashboard", auth("HOD"), getHodDashboard);
router.post("/counsel", auth("HOD"), counselStudent);

module.exports = router;
