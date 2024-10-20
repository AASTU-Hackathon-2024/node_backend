const env = require("dotenv");
env.config();

const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the AASTU-Hackathon Ecommerce platform!");
  console.log(req);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

