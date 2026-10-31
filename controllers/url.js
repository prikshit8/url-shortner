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

  const allURLs = await UrlModel.find({});
  return res.render("home", {
    shortenedURL,
    urls: allURLs,
  });
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await UrlModel.findOne({
    shortId,
  });
  if(!entry){
    return res.status(404).send("short URL not found");
  }
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirect,
};
