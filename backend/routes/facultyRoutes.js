const express = require("express");
const router = express.Router();

const faculty = require("../controllers/facultyController");

// ❗ TEMP: NO AUTH (FOR SUBMISSION SAFETY)
router.post("/qr/start", faculty.startQrSession);
router.post("/qr/end", faculty.endQrSession);

module.exports = router;
