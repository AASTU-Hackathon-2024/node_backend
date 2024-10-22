const express = require("express");
const bodyParser = require("body-parser");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const env = require("dotenv");

env.config();
const port = process.env.PORT || 8000;
const app = express();

const user = require("./routes/user");
const auth = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("Welcome to the AASTU-Hackathon Ecommerce platform!");
  console.log(req);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", user);
app.use("auth", auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
