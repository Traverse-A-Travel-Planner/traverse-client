module.exports = {
  handleLogout() {
    localStorage.removeItem("token");
    window.location.assign("/login");
  },
  redirectIfNotLoggedIn() {
    let allowed_paths = ["/login", "/signup"];
    let current_path = window.location.pathname;

    let token = localStorage.getItem("token");
    if (!token) {
      if (allowed_paths.includes(current_path)) return;
      window.location.assign("/login");
    }
  },
  isAuthPage() {
    let auth_paths = ["/login", "/signup"];
    let current_path = window.location.pathname;

    if (auth_paths.includes(current_path)) {
      return true;
    } else {
      return false;
    }
  },
};
