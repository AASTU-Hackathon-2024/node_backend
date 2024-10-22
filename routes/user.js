const express = require("express");

const { createUser,getUsers } = require("../controllers/user");

const authenticateToken = require("../middleware/authenticate");

const router = express.Router();

router.post("/create", createUser);
router.get("/getUsers", getUsers);

module.exports = router;
