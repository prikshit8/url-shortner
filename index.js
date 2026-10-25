const express = require("express");

const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-urls")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("error while connecting DB", err));

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`server up and running on ${PORT}`));
