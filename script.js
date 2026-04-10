document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const setToggleIcon = (theme) => {
    if (theme === "dark") {
      themeToggleBtn.innerHTML = '<span aria-hidden="true">☀️</span>';
    } else {
      themeToggleBtn.innerHTML = '<span aria-hidden="true">🌙</span>';
    }
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggleBtn.setAttribute("aria-label", "Switch to Light Mode");
    } else {
      document.body.classList.remove("dark-theme");
      themeToggleBtn.setAttribute("aria-label", "Switch to Dark Mode");
    }
    setToggleIcon(theme);
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    const nextTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
});
