import express from "express";
import {
  getBnpl,
  updateKyc,
  uploadKyc,
} from "../controllers/bnpl.js";

const bnplRouter = express.Router();

bnplRouter.post("/uploadKyc", uploadKyc);
bnplRouter.post("/update", updateKyc);
bnplRouter.get("/list", getBnpl);

export default bnplRouter;
