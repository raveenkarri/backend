const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getUser);

module.exports = router;
