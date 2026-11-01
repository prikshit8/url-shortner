const express = require("express");
const UrlModel = require("../models/url");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");

const router = express.Router();

//// public routes
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

//// protected route
router.get("/", restrictToLoggedInUserOnly, async (req, res) => {
  const allUrls = await UrlModel.find({});
  return res.render("home", {
    url: allUrls,
    user: req.user,
  });
});

module.exports = router;
