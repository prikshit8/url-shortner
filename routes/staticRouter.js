const express = require("express");
const UrlModel = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await UrlModel.find({});
  return res.render("home", {
    url: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
