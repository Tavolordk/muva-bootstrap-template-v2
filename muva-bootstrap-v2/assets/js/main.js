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
  const cards = document.querySelectorAll(".facial-option-card");

  const toggleActiveCard = (selectedCard) => {
    const isAlreadyActive = selectedCard.classList.contains("is-active");

    cards.forEach((card) => card.classList.remove("is-active"));

    if (!isAlreadyActive) {
      selectedCard.classList.add("is-active");
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      toggleActiveCard(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleActiveCard(card);
      }
    });
  });
});
