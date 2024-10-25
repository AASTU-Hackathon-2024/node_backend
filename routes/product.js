import express from "express";
import {
  postProduct,
  getProducts,
  addToCart,
  removeProduct,
  addToWishlist,
} from "../controllers/product.js";

const productRouter = express.Router();

productRouter.get("/list", getProducts);
productRouter.post("/upload", postProduct);
productRouter.post("/cart/create", addToCart);
productRouter.delete("/:id", removeProduct);
productRouter.post("/wishlist/create", addToWishlist);

export default productRouter;
