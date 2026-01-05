const router = require("express").Router();
const { markAttendance } = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");

router.post("/attendance/mark", auth("STUDENT"), markAttendance);

module.exports = router;
