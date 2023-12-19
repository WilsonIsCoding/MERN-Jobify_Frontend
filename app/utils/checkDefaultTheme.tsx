export default function checkDefaultTheme() {
  if (typeof window !== "undefined") {
    const isDarkTheme = localStorage.getItem("darkTheme") === "true";
    document.body.classList.toggle("dark-theme", isDarkTheme);
    return isDarkTheme;
  } else {
    return true;
  }
}
