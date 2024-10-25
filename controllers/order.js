import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();
const prisma = new PrismaClient();

const placeOrder = async (req, res) => {
  try {
    const {
      amount,
      status = "pending",
      address,
      userId,
      productId,
      zipcode = null,
      phone,
    } = req.body;

    const user = await prisma.user.findUnique({ where: { userId } });
    const product = await prisma.product.findUnique({ where: { productId } });
    if (!user || !product)
      res.status(400).json({ message: "User doesn't exist" });

    const orderId = uid.rnd(8);
    const order = await prisma.order.create({
      data: {
        amount,
        status,
        address,
        userId,
        productId,
        zipcode,
        phone,
        orderId,
      },
    });

    res.status(200).json({ message: "Order created succesfully", order });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { status, orderId } = req.body;
  if (!status || !orderId)
    res.status(400).json({
      message: "Order id and status is required to update status of the order",
    });
  try {
    const updateOrder = await prisma.order.update({
      where: { orderId },
      data: {
        status: status.toUpperCase(),
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

const removeOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId)
    res.status(400).json({ message: "Order id is required to remove record." });
  try {
    await prisma.order.delete({
      where: {
        orderId,
      },
    });
    res.status(200).json({ message: `Order-${orderId} removed succesfully` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export { placeOrder, updateOrderStatus, removeOrder };
