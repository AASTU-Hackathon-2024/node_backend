const express = require("express");
const { postProduct, getProducts} = require("../controllers/user");
const { signIn } = require("../controllers/auth");

const router = express.Router();

router.get("/signin", signIn);

module.exports = router;
