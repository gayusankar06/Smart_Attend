const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { generateQR } = require("../controllers/qrController");


router.post("/generate", auth, generateQR);


module.exports = router;