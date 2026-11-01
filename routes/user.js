const express = require("express");

const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/handleUserLogout", handleUserLogout);

module.exports = router;