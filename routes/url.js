const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirect,
} = require("../controllers/url");

const router = express.Router();

// POST /URL -> generate a new SHORT URL and return shortened URL

// GET /url/:shortid -> redirect the user to the original URL

// GET /url/anaylytics/:shortid -> numbers of clicks for shortened URL

router.post("/", handleGenerateNewShortURL);

// Nptc6xb4R
router.get("/:shortId", handleRedirect);

// router.get('/anaylytics/:shortid',);

module.exports = router;
