const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getStudentDashboard } = require("../controllers/studentController");

router.get("/dashboard", auth, getStudentDashboard);

module.exports = router;
