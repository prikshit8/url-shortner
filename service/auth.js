const sessioIdToUserMap = new Map();

function setUserId(id, user) {
  sessioIdToUserMap.set(id, user);
}

function getUserBySessionId(id) {
  return sessioIdToUserMap.get(id);
}

module.exports = {
  setUserId,
  getUserBySessionId,
};
