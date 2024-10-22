const express = require("express");
const { createUser, getUsers } = require("../controllers/user");
const { signIn } = require("../controllers/auth");

const router = express.Router();

router.get("/signin", signIn);

module.exports = router;
