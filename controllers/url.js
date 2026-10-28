const shortid = require("shortid");
const UrlModel = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const redirectURL = req.body.redirectURL;

  if (!redirectURL) return res.status(400).json({ error: "url is required" });

  const shortenedURL = shortid.generate();

  await UrlModel.create({
    shortId: shortenedURL,
    redirectURL,
    visitHistory: [],
  });
  return res.render("shortened", { shortenedURL, redirectURL });
  return res.status(201).json({ id: shortenedURL });
}

// bit.ly/url/Nptc6xb4R

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await UrlModel.findOne({
    shortId,
  });
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirect,
};
