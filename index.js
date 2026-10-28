const express = require("express");
const path = require("path");

const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const UrlModel = require("./models/url");

const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-urls")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("error while connecting DB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  const allUrls = await UrlModel.find({});
  res.render("home", { urls: allUrls });
});

// app.get("/html", async (req, res) => {
//   const allUrls = await UrlModel.find({});
//   return res.end(`
//     <html>
//     <head>URL shortner</head>
//     <body>
//     <ol>
//     ${allUrls.map((url) => `<li>${url.shortId} - ${url.redirectURL}</li>`)}
//     </ol>
//     </body>
//     </html>
//     `);
// });

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`server up and running on ${PORT}`));
