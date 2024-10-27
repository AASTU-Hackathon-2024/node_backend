import express from "express";
import {
  addToCart,
  addToWishlist,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  removeCartItem,
  removeWishlistItem,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.get("/list", getUsers);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUser);

userRouter.post("/cart/add", addToCart);
userRouter.post("/wishlist/add", addToWishlist);
userRouter.delete("/cart/:id", removeCartItem);
userRouter.delete("/wishlist/:id", removeWishlistItem);

export default userRouter;
