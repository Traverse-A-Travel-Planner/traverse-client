// import appwriteClient from "./appwriteClient";
// import { appwriteProjectId } from "./config";

export async function handleLogout() {
  localStorage.removeItem("cookieFallback");
  window.location.assign("/login");
}

export function capitalizeFirstCharacter(string = "text") {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// export async function fetchUserDetails(userId) {
//   const url = `https://api.appwrite.io/v1/users/${userId}`;
  
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Appwrite-Project': appwriteProjectId,
//       },
//     });

//     const data = await response.json();
//     console.log(data)
//     return data
//   } catch (error) {
//     console.error("Error fetching user details", error);
//     throw error;
//   }
// }
