export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export const formatDate = (date) => {
  return (
    new Date(date).toLocaleDateString("default", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }) +
    " " +
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

export const sanitize = (string) => {
  return string
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
};