document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    const menu = document.querySelector("#mainMenu");
    if (menu && menu.classList.contains("show"))
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const facialCards = document.querySelectorAll(".facial-option-card");

  facialCards.forEach((card) => {
    card.addEventListener("click", () => {
      facialCards.forEach((item) => item.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });
});
