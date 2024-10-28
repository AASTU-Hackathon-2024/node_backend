import express from "express";
import { checkLegiblity, updateKyc, uploadKyc } from "../controllers/bnpl.js";

const bnplRouter = express.Router();

bnplRouter.post("/uploadKyc", uploadKyc);
bnplRouter.get("/:id", checkLegiblity);
bnplRouter.post("/update", updateKyc);

export default bnplRouter;