const express = require("express");

const {
  handleGenerateNewShortURL,
  handleRedirect,
} = require("../controllers/url");

const {
  restrictToLoggedInUserOnly,
} = require("../middlewares/auth");

const router = express.Router();

// POST /URL -> generate a new SHORT URL and return shortened URL

// GET /url/:shortid -> redirect the user to the original URL

// GET /url/anaylytics/:shortid -> numbers of clicks for shortened URL

router.post("/", restrictToLoggedInUserOnly, handleGenerateNewShortURL);

router.get("/:shortId", handleRedirect);

module.exports = router;
