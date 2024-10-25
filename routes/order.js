import express from "express";
import {
  placeOrder,
  removeOrder,
  updateOrderStatus,
} from "../controllers/order.js";

const orderRouter = express.Router();

orderRouter.delete("/:id", removeOrder);
orderRouter.post("/create", placeOrder);
orderRouter.post("/update", updateOrderStatus);

export default orderRouter;
