export const tokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

function getLocalRefreshToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.tokens.refresh) {
    return user.tokens.refresh.token;
  } else {
    return;
  }
}
function getLocalAccessToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.tokens.access) {
    return user.tokens.access.token;
  } else {
    return;
  }
}
function updateLocalAccessToken(token) {
  let user = JSON.parse(localStorage.getItem("user"));
  user.tokens = token;
  localStorage.setItem("user", JSON.stringify(user));
}
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function removeUser() {
  localStorage.removeItem("user");
}
