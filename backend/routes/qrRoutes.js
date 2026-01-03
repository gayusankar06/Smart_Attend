const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { generateQR, scanQR } = require("../controllers/qrController");

router.post("/generate", auth, generateQR);
router.post("/scan", auth, scanQR);

module.exports = router;
