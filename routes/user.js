import express from "express";
import { createUser, deleteUser, getUsers } from "../controllers/user.js";
// import authenticateToken from "../middleware/authenticate.js";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.get("/list", getUsers);
userRouter.delete("/:id", deleteUser);

export default userRouter;
