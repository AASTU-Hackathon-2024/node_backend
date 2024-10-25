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

const deleteUser = async (req, res) => {
  const { id } = req.query;
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

export { createUser, getUsers, deleteUser };
