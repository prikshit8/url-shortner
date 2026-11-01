const sessioIdToUserMap = new Map();

function setUserId(id, user) {
  sessioIdToUserMap.set(id, user);
}

function getUserBySessionId(id) {
  return sessioIdToUserMap.get(id);
}

function removeUserId(id) {
  sessioIdToUserMap.delete(id);
}

module.exports = {
  setUserId,
  getUserBySessionId,
  removeUserId,
};
