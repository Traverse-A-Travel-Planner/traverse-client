async function handleLogout() {
  localStorage.removeItem("cookieFallback");
  window.location.assign("/login");
}

function capitalizeFirstCharacter(string = "text") {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDateToLocal(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

module.exports = {handleLogout, capitalizeFirstCharacter, formatDateToLocal}