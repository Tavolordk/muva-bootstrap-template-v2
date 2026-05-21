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

  const testimonialSlider = document.querySelector("#testimonialSlider");
  const prevButton = document.querySelector(".testimonial-prev");
  const nextButton = document.querySelector(".testimonial-next");

  if (testimonialSlider && prevButton && nextButton) {
    let currentPosition = 0;
    const cardStep = 326;

    const getMaxScroll = () => {
      const container = testimonialSlider.parentElement;
      return Math.max(
        0,
        testimonialSlider.scrollWidth - container.clientWidth + 40,
      );
    };

    const updateSlider = () => {
      if (window.innerWidth <= 991) {
        testimonialSlider.style.transform = "translateX(0)";
        return;
      }

      testimonialSlider.style.transform = `translateX(-${currentPosition}px)`;
    };

    nextButton.addEventListener("click", () => {
      const maxScroll = getMaxScroll();

      currentPosition += cardStep;

      if (currentPosition > maxScroll) {
        currentPosition = 0;
      }

      updateSlider();
    });

    prevButton.addEventListener("click", () => {
      const maxScroll = getMaxScroll();

      currentPosition -= cardStep;

      if (currentPosition < 0) {
        currentPosition = maxScroll;
      }

      updateSlider();
    });

    setInterval(() => {
      if (window.innerWidth <= 991) {
        return;
      }

      const maxScroll = getMaxScroll();

      currentPosition += cardStep;

      if (currentPosition > maxScroll) {
        currentPosition = 0;
      }

      updateSlider();
    }, 4500);

    window.addEventListener("resize", () => {
      currentPosition = 0;
      updateSlider();
    });
  }
});
