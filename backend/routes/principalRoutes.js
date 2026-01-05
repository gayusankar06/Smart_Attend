const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getOverallAttendance } = require("../controllers/principalController");

router.get("/attendance", auth, getOverallAttendance);

module.exports = router;
