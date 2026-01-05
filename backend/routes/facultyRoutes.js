const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const faculty = require("../controllers/facultyController");

router.post("/qr/start", auth, faculty.startQrSession);
router.post("/qr/end", auth, faculty.endQrSession);
router.post("/qr/scan", auth, faculty.scanQr);
router.get("/attendance", auth, faculty.getFacultyAttendance);

module.exports = router;
