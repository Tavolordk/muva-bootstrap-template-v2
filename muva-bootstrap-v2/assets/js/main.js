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

const bookingForms = document.querySelectorAll(".booking-form");

bookingForms.forEach((form) => {
  const message = form.querySelector(".booking-form-message");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.action || form.action.includes("TU_ID_DE_FORMSPREE")) {
      if (message) {
        message.textContent =
          "Please configure the Formspree endpoint before sending.";
        message.classList.remove("is-success");
        message.classList.add("is-error");
      }
      return;
    }

    const formData = new FormData(form);

    if (message) {
      message.textContent = "Sending request...";
      message.classList.remove("is-success", "is-error");
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();

      if (message) {
        message.textContent =
          "Your request was sent successfully. We will contact you soon.";
        message.classList.remove("is-error");
        message.classList.add("is-success");
      }
    } catch (error) {
      if (message) {
        message.textContent =
          "There was a problem sending your request. Please try again.";
        message.classList.remove("is-success");
        message.classList.add("is-error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit contact request";
      }
    }
  });
});
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

if (heroSlides.length && heroDots.length) {
  let currentHeroSlide = 0;
  let heroInterval = null;

  const showHeroSlide = (nextIndex) => {
    if (nextIndex === currentHeroSlide) {
      return;
    }

    const currentSlide = heroSlides[currentHeroSlide];
    const nextSlide = heroSlides[nextIndex];

    currentSlide.classList.add("is-leaving");
    currentSlide.classList.remove("is-active");

    nextSlide.classList.add("is-active");

    heroDots[currentHeroSlide].classList.remove("is-active");
    heroDots[nextIndex].classList.add("is-active");

    setTimeout(() => {
      currentSlide.classList.remove("is-leaving");
    }, 800);

    currentHeroSlide = nextIndex;
  };

  const goToNextHeroSlide = () => {
    const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  };

  const startHeroAutoplay = () => {
    heroInterval = setInterval(goToNextHeroSlide, 5200);
  };

  const restartHeroAutoplay = () => {
    clearInterval(heroInterval);
    startHeroAutoplay();
  };

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const nextIndex = Number(dot.dataset.slide);
      showHeroSlide(nextIndex);
      restartHeroAutoplay();
    });
  });

  startHeroAutoplay();
}
