const jwt = require("jsonwebtoken");
const secretKey = "bitcoin@satoshi!!!!";
// const sessioIdToUserMap = new Map();

function setUser(user) {
  // sessioIdToUserMap.set(id, user);
  return jwt.sign({ _id: user.id, email: user.email }, secretKey);
}

function getUser(token) {
  if(!token) return null;
  try{
    return jwt.verify(token,secretKey);
  }
  catch(err){
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
