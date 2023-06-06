module.exports = {
  handleLogout() {
    localStorage.removeItem("cookieFallback");
    window.location.assign("/login");
  }
};
