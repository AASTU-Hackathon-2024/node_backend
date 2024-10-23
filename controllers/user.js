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
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password,
        role: role,
        userId: uid.rnd(8),
      },
    });

    res.status(201).json({
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export { createUser, getUsers };
