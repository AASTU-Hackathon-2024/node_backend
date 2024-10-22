const express = require("express");
const { getProducts, postProduct } = require("../controllers/product");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.get("/list", getProducts);
router.post("/upload", upload.single("image"), postProduct);

module.exports = router;
