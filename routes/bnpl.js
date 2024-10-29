import express from "express";
import {
  checkLegiblity,
  getBnpl,
  updateKyc,
  uploadKyc,
} from "../controllers/bnpl.js";

const bnplRouter = express.Router();
bnplRouter.post("/uploadKyc", uploadKyc);
bnplRouter.get("/:id", checkLegiblity);
bnplRouter.post("/update", updateKyc);
bnplRouter.get("/list", getBnpl);

export default bnplRouter;
