const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { setUserId,removeUserId } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).render("signup", {
      error: "All fields are required",
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).render("signup", {
      error: "An account with this email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).render("login", {
      error: "Invalid email or password",
    });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).render("login", {
      error: "Invalid email or password",
    });
  }
  const sessionId = crypto.randomUUID();
  setUserId(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

function handleUserLogout(req,res){
  const sessionId = req.cookies?.uid;
  if(sessionId){
    removeUserId(sessionId);
  }
  res.clearCookie("uid");
  return res.redirect("/login");
}

module.exports = {
  handleUserLogin,
  handleUserSignUp,
  handleUserLogout,
};
