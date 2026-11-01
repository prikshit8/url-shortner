const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-urls")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("error while connecting DB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/user",userRoute);

app.use("/", staticRoute);

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`server up and running on ${PORT}`));
