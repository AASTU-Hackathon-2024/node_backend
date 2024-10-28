import express from "express";
import {
  getOrders,
  placeOrder,
  removeOrder,
  updateOrderStatus,
} from "../controllers/order.js";

const orderRouter = express.Router();

orderRouter.post("/create", placeOrder);
orderRouter.post("/update", updateOrderStatus);
orderRouter.get("/list", getOrders);

export default orderRouter;
