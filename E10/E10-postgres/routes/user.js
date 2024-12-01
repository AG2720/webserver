const express = require("express");
const { getUsers, createUser } = require("../controllers/users");

const router = express.Router();

// Route for getting all users
router.get("/", getUsers);

// Route for creating a new user
router.post("/", createUser);

module.exports = router;
