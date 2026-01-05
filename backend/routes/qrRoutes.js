const router = require("express").Router();
const { createQrSession } = require("../controllers/qrController");
const auth = require("../middleware/authMiddleware");

router.post("/generate", auth("FACULTY"), createQrSession);

module.exports = router;
