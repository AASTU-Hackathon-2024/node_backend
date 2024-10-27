import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

import { hashPassword } from "../utils/password.js";

const uid = new ShortUniqueId();
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user !== null) throw new Error("User already exists");
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role?.toUpperCase(),
        userId: uid.rnd(8),
      },
    });

    res.status(201).json({
      message: "Successfully registered",
      user: newUser,
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res
      .status(500)
      .json({ message: "Failed to register user", error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { carts: true, wishlists: true, kyc: true },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userId: id },
      include: { carts: true, wishlists: true, kyc: true },
    });
    if (!user) throw new Error("Failed to fetch user");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ message: `Failed to fetch user-${id}`, error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) res.status(400).json({ message: "id is required to delete user" });
  try {
    await prisma.user.delete({ where: { userId: id } });
    res.status(200).json({ message: "User delted succesfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
};

const addToCart = async (req, res) => {
  const { userId, productId, variationId, quantity } = req.body;
  if (!userId || !productId)
    res.status(400).json({ message: "User id and product id is required" });

  try {
    const item = await prisma.cart.create({
      data: {
        quantity,
        user: {
          connect: { userId },
        },
        product: {
          connect: { productId },
        },
        variation: {
          connect: { variationId },
        },
      },
    });
    res.status(200).json({ message: "item added to cart succesfully", item });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const addToWishlist = async (req, res) => {
  const { userId, productId, variationId } = req.body;
  if (!userId || !productId)
    res.status(400).json({ message: "User id and product id is required" });

  try {
    const item = await prisma.wishList.create({
      data: {
        user: {
          connect: { userId },
        },
        product: {
          connect: { productId },
        },
        variation: {
          connect: { variationId },
        },
      },
    });
    res
      .status(200)
      .json({ message: "item added to Wishilist succesfully", item });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cart.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "item removed from cart succesfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const removeWishlistItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.wishList.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(200)
      .json({ message: "item removed to wishilist succesfully", item });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  addToCart,
  addToWishlist,
  removeCartItem,
  removeWishlistItem,
};
