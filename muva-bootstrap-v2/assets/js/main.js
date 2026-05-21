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

    const isMobileTestimonials = () => window.innerWidth <= 991;

    const getMaxScroll = () => {
      const container = testimonialSlider.parentElement;
      return Math.max(
        0,
        testimonialSlider.scrollWidth - container.clientWidth + 40,
      );
    };

    const updateSlider = () => {
      if (isMobileTestimonials()) {
        testimonialSlider.style.transform = "translateX(0)";
        return;
      }

      testimonialSlider.style.transform = `translateX(-${currentPosition}px)`;
    };

    nextButton.addEventListener("click", () => {
      if (isMobileTestimonials()) {
        testimonialSlider.scrollBy({
          left: 270,
          behavior: "smooth",
        });
        return;
      }

      const maxScroll = getMaxScroll();

      currentPosition += cardStep;

      if (currentPosition > maxScroll) {
        currentPosition = 0;
      }

      updateSlider();
    });

    prevButton.addEventListener("click", () => {
      if (isMobileTestimonials()) {
        testimonialSlider.scrollBy({
          left: -270,
          behavior: "smooth",
        });
        return;
      }

      const maxScroll = getMaxScroll();

      currentPosition -= cardStep;

      if (currentPosition < 0) {
        currentPosition = maxScroll;
      }

      updateSlider();
    });

    setInterval(() => {
      if (isMobileTestimonials()) {
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
      testimonialSlider.scrollLeft = 0;
      updateSlider();
    });
  }

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
  const searchData = [
    {
      title: "Facials",
      category: "Service",
      description:
        "Signature Glow Facial, Deep Cleansing Facial, Hydrating Glow Facial and Rejuvenating Anti-Aging Facial.",
      url: "facials.html",
      keywords: [
        "facial",
        "facials",
        "glow",
        "skin",
        "cleansing",
        "hydrating",
        "anti aging",
        "rejuvenating",
      ],
    },
    {
      title: "Japanese Head Spa",
      category: "Service",
      description:
        "Deluxe, Classic and hydrating scalp treatments focused on relaxation, hair care and scalp wellness.",
      url: "head-spa.html",
      keywords: [
        "japanese",
        "head spa",
        "spa",
        "scalp",
        "hair",
        "massage",
        "deluxe",
        "classic",
      ],
    },
    {
      title: "Keratine Hair Treatment",
      category: "Service",
      description:
        "Organic and Botox hair treatments designed to smooth, hydrate and reduce frizz.",
      url: "keratine.html",
      keywords: [
        "keratine",
        "keratin",
        "hair",
        "organic",
        "botox hair",
        "frizz",
        "smooth",
      ],
    },
    {
      title: "Massage",
      category: "Service",
      description:
        "Essential massage focused on relaxation, tension relief and body balance.",
      url: "massage.html",
      keywords: [
        "massage",
        "essential massage",
        "relax",
        "relaxation",
        "body",
        "stress",
      ],
    },
    {
      title: "Botox",
      category: "Service",
      description:
        "Aesthetic treatment to soften fine lines and wrinkles with a smoother, youthful look.",
      url: "botox.html",
      keywords: ["botox", "wrinkles", "fine lines", "aesthetic", "youthful"],
    },
    {
      title: "Derma Fillers",
      category: "Service",
      description:
        "Dermal fillers for upper face, lower face and lips, focused on volume and facial definition.",
      url: "fillers.html",
      keywords: [
        "fillers",
        "dermal fillers",
        "lips",
        "jawline",
        "volume",
        "face",
      ],
    },
    {
      title: "PRP & Microneedling",
      category: "Service",
      description:
        "PRP treatment to support collagen, skin texture, tone and rejuvenation.",
      url: "prp.html",
      keywords: [
        "prp",
        "platelet",
        "plasma",
        "microneedling",
        "collagen",
        "skin texture",
      ],
    },
    {
      title: "IV Therapy",
      category: "Service",
      description:
        "Wellness therapy focused on hydration, energy and recovery.",
      url: "head-spa.html",
      keywords: [
        "iv therapy",
        "iv",
        "therapy",
        "hydration",
        "energy",
        "wellness",
      ],
    },
    {
      title: "Book your experience",
      category: "Reservation",
      description:
        "Send a booking request with your name, phone, email, service, date and time.",
      url: "#reservation",
      keywords: [
        "booking",
        "book",
        "reservation",
        "appointment",
        "contact",
        "date",
        "time",
      ],
    },
    {
      title: "About MUVA",
      category: "Section",
      description:
        "Premium aesthetic care with advanced technology and personalized treatments.",
      url: "#about",
      keywords: [
        "about",
        "muva",
        "aesthetics",
        "beauty",
        "technology",
        "personalized care",
      ],
    },
  ];

  const searchInput = document.querySelector("#siteSearchInput");
  const searchClearButton = document.querySelector(".site-search-clear");
  const searchResultsSection = document.querySelector("#searchResultsSection");
  const searchResultsList = document.querySelector("#searchResultsList");
  const searchNotFound = document.querySelector("#searchNotFound");
  const searchResultsCounter = document.querySelector("#searchResultsCounter");

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const renderSearchResults = (query) => {
    if (
      !searchInput ||
      !searchResultsSection ||
      !searchResultsList ||
      !searchNotFound
    ) {
      return;
    }

    const cleanQuery = normalizeText(query);

    if (!cleanQuery) {
      searchResultsSection.hidden = true;
      searchResultsList.innerHTML = "";
      searchNotFound.hidden = true;

      if (searchClearButton) {
        searchClearButton.classList.remove("is-visible");
      }

      return;
    }

    if (searchClearButton) {
      searchClearButton.classList.add("is-visible");
    }

    const results = searchData.filter((item) => {
      const searchableText = normalizeText(
        [
          item.title,
          item.category,
          item.description,
          item.keywords.join(" "),
        ].join(" "),
      );

      return searchableText.includes(cleanQuery);
    });

    searchResultsSection.hidden = false;
    searchResultsList.innerHTML = "";

    if (results.length === 0) {
      searchNotFound.hidden = false;

      if (searchResultsCounter) {
        searchResultsCounter.textContent = `No results for "${query}".`;
      }

      return;
    }

    searchNotFound.hidden = true;

    if (searchResultsCounter) {
      searchResultsCounter.textContent = `${results.length} result${results.length === 1 ? "" : "s"} found for "${query}".`;
    }

    const resultHtml = results
      .map((item) => {
        return `
        <a class="search-result-item" href="${item.url}">
          <span>${item.category}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </a>
      `;
      })
      .join("");

    searchResultsList.innerHTML = resultHtml;
  };

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      renderSearchResults(event.target.value);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        searchInput.value = "";
        renderSearchResults("");
      }
    });
  }

  if (searchClearButton && searchInput) {
    searchClearButton.addEventListener("click", () => {
      searchInput.value = "";
      renderSearchResults("");
      searchInput.focus();
    });
  }
});
