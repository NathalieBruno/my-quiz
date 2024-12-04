let darkMode = document.querySelector(".dark-mode-toggle");

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode-toggle");
  darkMode.textContent = document.body.classList.contains("dark-mode-toggle") ? "Light theme 🌞 " : "Dark theme 😎 ";
});
