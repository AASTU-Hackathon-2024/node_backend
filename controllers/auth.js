import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../utils/password.js";

const prisma = new PrismaClient();

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ error: "Email and password are required" });

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.json({ errors: { email: "Invalid email" } });
    }

    if (!(await verifyPassword(password, user.password))) {
      return res.json({ errors: { password: "Incorrect password" } });
    }

    res.json({
      message: "Sign-in successful",
      user,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "failed to signin", error: error.message });
  }
};

export { signIn };
