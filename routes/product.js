import express from "express";
import {
  postProduct,
  getProducts,
  removeProduct,
  getProduct,
  isAvailable,
} from "../controllers/product.js";

const productRouter = express.Router();

productRouter.get("/list", getProducts);
productRouter.post("/upload", postProduct);
productRouter.delete("/:id", removeProduct);
productRouter.post("/check-stock", isAvailable);
productRouter.get("/:id", getProduct);



export default productRouter;