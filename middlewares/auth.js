const { getUserBySessionId } = require("../service/auth");

function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.redirect("/login");
  }
  const user = getUserBySessionId(userUid);
  if (!user) {
    return res.redirect("/login");
  }
  return next();
}

module.exports = {
  restrictToLoggedInUserOnly,
};
