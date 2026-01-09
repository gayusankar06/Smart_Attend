const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const student = require("../controllers/studentController");

router.post("/attendance/mark", auth("STUDENT"), student.markAttendance);

module.exports = router;
