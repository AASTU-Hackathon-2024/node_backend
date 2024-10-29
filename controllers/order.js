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
      variationId,
      zipcode,
      phone,
      paymentMethod,
      isBnpl,
    } = req.body;
    const orderId = uid.rnd(8);

    const newOrder = await prisma.order.create({
      data: {
        orderId,
        amount,
        status: status?.toUpperCase(),
        shippingAddress: address,
        zipcode,
        phone,
        PaymentMethod: paymentMethod?.toUpperCase(),

        variation: {
          connect: {
            variationId,
          },
        },
        proudct: {
          connect: { productId },
        },
        user: {
          connect: {
            userId,
          },
        },
      },
    });
    console.log(newOrder);
    if (isBnpl) {
      const bnplStatus = await prisma.bnpl.findMany({ where: { userId } });
      if (
        bnplStatus?.some((record) => record.installement !== record.base) &&
        bnplStatus.length
      )
        res.status(400).json({ message: "Pay your current bnpl debt" });
      prisma.bnpl.create({
        data: {
          userId,
          orderId,
          installement,
          base,
        },
      });
    }

    res.status(200).json({ message: "Order created succesfully", newOrder });
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

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

export { placeOrder, updateOrderStatus, removeOrder, getOrders };
