import express from "express";
import { createUser, getUsers } from "../controllers/user.js";
// import authenticateToken from "../middleware/authenticate.js";


const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/list", getUsers);

export default userRouter;
