import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";

import user from "./routes/user.js";
import products from "./routes/product.js";
import auth from "./routes/auth.js";


config();
const port = process.env.PORT || 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the AASTU-Hackathon Ecommerce platform!");
  console.log(req);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/auth", auth);
app.use("/products", products);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
