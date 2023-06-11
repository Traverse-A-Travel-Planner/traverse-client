export async function handleLogout() {
  localStorage.removeItem("cookieFallback");
  window.location.assign("/login");
}

export function capitalizeFirstCharacter(string = "text") {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
