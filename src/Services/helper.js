module.exports = {
  handleLogout() {
    localStorage.removeItem("cookieFallback");
    window.location.assign("/login");
  },
  capitalizeFirstCharacter(string="text") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
