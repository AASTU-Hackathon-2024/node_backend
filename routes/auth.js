import express from "express";
import { createUser, getUsers } from "../controllers/user.js";
import { signIn } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/signin", signIn);

export default authRouter;
