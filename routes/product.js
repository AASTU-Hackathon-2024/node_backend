import express from "express";
import multer from "multer";
import path from "path";
import ShortUniqueId from "short-unique-id";

import { postProduct, getProducts } from "../controllers/product.js";

const uid = new ShortUniqueId();
// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/products"); // Directory to save uploaded files
  },
  filename: function (_, file, cb) {
    cb(null, product + path.extname(file.originalname)); // Append date to filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

const productRouter = express.Router();

productRouter.get("/list", getProducts);
productRouter.post("/upload", upload.single("image"), postProduct);

export default productRouter;
