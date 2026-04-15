const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");

if (burger && nav) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-open");

    const expanded = burger.classList.contains("is-active");
    burger.setAttribute("aria-expanded", expanded);
    document.body.classList.toggle("menu-open", expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-active");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickBurger = burger.contains(e.target);

    if (
      !isClickInsideNav &&
      !isClickBurger &&
      nav.classList.contains("is-open")
    ) {
      burger.classList.remove("is-active");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });
}

const animatedElements = document.querySelectorAll(
  ".fade-up, .fade-in, .fade-left",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  },
);

animatedElements.forEach((el) => observer.observe(el));

const certTrack = document.querySelector(".cert-slider__track");
const certCards = document.querySelectorAll(".cert-card");
const prevBtn = document.querySelector(".cert-slider__arrow--prev");
const nextBtn = document.querySelector(".cert-slider__arrow--next");
const dotsWrap = document.querySelector(".cert-slider__dots");

if (certTrack && certCards.length && prevBtn && nextBtn && dotsWrap) {
  let currentIndex = 0;

  const getCardsPerView = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  };

  const createDots = () => {
    dotsWrap.innerHTML = "";
    const pages = Math.ceil(certCards.length / getCardsPerView());

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.className = "cert-slider__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Перейти до групи сертифікатів ${i + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
      });

      dotsWrap.appendChild(dot);
    }
  };

  const updateActiveCards = () => {
    certCards.forEach((card) => card.classList.remove("is-active"));

    const cardsPerView = getCardsPerView();
    const start = currentIndex * cardsPerView;
    const end = start + cardsPerView;

    certCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.classList.add("is-active");
      }
    });
  };

  const updateDots = () => {
    const dots = dotsWrap.querySelectorAll(".cert-slider__dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const updateSlider = () => {
    const cardsPerView = getCardsPerView();
    const gap = window.innerWidth <= 768 ? 24 : 24;
    const cardWidth = certCards[0].offsetWidth + gap;
    const maxIndex = Math.ceil(certCards.length / cardsPerView) - 1;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    certTrack.style.transform = `translateX(-${currentIndex * cardWidth * cardsPerView}px)`;

    updateActiveCards();
    updateDots();
  };

  prevBtn.addEventListener("click", () => {
    currentIndex -= 1;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex += 1;
    updateSlider();
  });

  window.addEventListener("resize", () => {
    const maxIndex = Math.ceil(certCards.length / getCardsPerView()) - 1;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    createDots();
    updateSlider();
  });

  createDots();
  updateSlider();
}

const requestsSection = document.querySelector(".requests");
const requestsTrack = document.querySelector(".requests__track");
const requestsCards = document.querySelectorAll(".request-card");
const requestsPrev = document.querySelector(".requests__arrow--prev");
const requestsNext = document.querySelector(".requests__arrow--next");
const requestsDotsWrap = document.querySelector(".requests__dots");

if (
  requestsSection &&
  requestsTrack &&
  requestsCards.length &&
  requestsPrev &&
  requestsNext &&
  requestsDotsWrap
) {
  let currentRequest = 0;

  const isMobileRequests = () => window.innerWidth <= 768;

  const createRequestDots = () => {
    if (!isMobileRequests()) {
      requestsDotsWrap.innerHTML = "";
      requestsTrack.style.transform = "";
      return;
    }

    requestsDotsWrap.innerHTML = "";

    requestsCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "requests__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Перейти до слайда ${index + 1}`);

      dot.addEventListener("click", () => {
        currentRequest = index;
        updateRequestsSlider();
      });

      requestsDotsWrap.appendChild(dot);
    });
  };

  const updateRequestsSlider = () => {
    if (!isMobileRequests()) {
      requestsTrack.style.transform = "";
      return;
    }

    const gap = 18;
    const cardWidth = requestsCards[0].offsetWidth + gap;
    const maxIndex = requestsCards.length - 1;

    if (currentRequest < 0) currentRequest = 0;
    if (currentRequest > maxIndex) currentRequest = maxIndex;

    requestsTrack.style.transform = `translateX(-${currentRequest * cardWidth}px)`;

    const dots = requestsDotsWrap.querySelectorAll(".requests__dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentRequest);
    });
  };

  requestsPrev.addEventListener("click", () => {
    if (!isMobileRequests()) return;
    currentRequest -= 1;
    updateRequestsSlider();
  });

  requestsNext.addEventListener("click", () => {
    if (!isMobileRequests()) return;
    currentRequest += 1;
    updateRequestsSlider();
  });

  window.addEventListener("resize", () => {
    if (!isMobileRequests()) {
      currentRequest = 0;
    } else if (currentRequest > requestsCards.length - 1) {
      currentRequest = requestsCards.length - 1;
    }

    createRequestDots();
    updateRequestsSlider();
  });

  createRequestDots();
  updateRequestsSlider();
}
const reqAltTrack = document.querySelector(".requests-alt__track");
const reqAltSlides = document.querySelectorAll(".request-row");
const reqAltPrev = document.querySelector(".requests-alt__arrow--prev");
const reqAltNext = document.querySelector(".requests-alt__arrow--next");
const reqAltDots = document.querySelector(".requests-alt__dots");

if (
  reqAltTrack &&
  reqAltSlides.length &&
  reqAltPrev &&
  reqAltNext &&
  reqAltDots
) {
  let current = 0;

  const isMobile = () => window.innerWidth <= 768;

  const createDots = () => {
    reqAltDots.innerHTML = "";
    if (!isMobile()) return;

    reqAltSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "requests-alt__dot";
      dot.type = "button";
      dot.addEventListener("click", () => {
        current = index;
        updateSlider();
      });
      reqAltDots.appendChild(dot);
    });
  };

  const updateSlider = () => {
    if (!isMobile()) {
      reqAltTrack.style.transform = "";
      return;
    }

    const gap = 20;
    const slideWidth = reqAltSlides[0].offsetWidth + gap;
    const max = reqAltSlides.length - 1;

    if (current < 0) current = 0;
    if (current > max) current = max;

    reqAltTrack.style.transform = `translateX(-${current * slideWidth}px)`;

    reqAltDots.querySelectorAll(".requests-alt__dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  };

  reqAltPrev.addEventListener("click", () => {
    if (!isMobile()) return;
    current--;
    updateSlider();
  });

  reqAltNext.addEventListener("click", () => {
    if (!isMobile()) return;
    current++;
    updateSlider();
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) current = 0;
    createDots();
    updateSlider();
  });

  createDots();
  updateSlider();
}

const requestsAltSection = document.querySelector(".requests-alt");
const requestsAltToggle = document.querySelector(".requests-alt__toggle");

if (requestsAltSection && requestsAltToggle) {
  requestsAltToggle.addEventListener("click", () => {
    requestsAltSection.classList.toggle("is-open");

    const isOpen = requestsAltSection.classList.contains("is-open");
    requestsAltToggle.textContent = isOpen ? "Згорнути" : "Читати більше";
  });
}

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
  const toggleBtn = card.querySelector(".product-card__toggle");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    card.classList.toggle("is-open");

    const isOpen = card.classList.contains("is-open");
    toggleBtn.textContent = isOpen ? "Сховати" : "Читати більше";
  });
});

const reviewsTrack = document.querySelector(".reviews-slider__track");
const reviewsCards = document.querySelectorAll(".reviews-card");
const reviewsPrev = document.querySelector(".reviews-slider__arrow--prev");
const reviewsNext = document.querySelector(".reviews-slider__arrow--next");
const reviewsDots = document.querySelector(".reviews-slider__dots");

if (
  reviewsTrack &&
  reviewsCards.length &&
  reviewsPrev &&
  reviewsNext &&
  reviewsDots
) {
  let currentReviewIndex = 0;

  const getReviewsPerView = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  };

  const createReviewDots = () => {
    reviewsDots.innerHTML = "";
    const pages = Math.ceil(reviewsCards.length / getReviewsPerView());

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.className = "reviews-slider__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Перейти до групи відгуків ${i + 1}`);

      dot.addEventListener("click", () => {
        currentReviewIndex = i;
        updateReviewsSlider();
      });

      reviewsDots.appendChild(dot);
    }
  };

  const updateReviewCards = () => {
    reviewsCards.forEach((card) => card.classList.remove("is-active"));

    const perView = getReviewsPerView();
    const start = currentReviewIndex * perView;
    const end = start + perView;

    reviewsCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.classList.add("is-active");
      }
    });
  };

  const updateReviewDots = () => {
    const dots = reviewsDots.querySelectorAll(".reviews-slider__dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentReviewIndex);
    });
  };

  const updateReviewsSlider = () => {
    const perView = getReviewsPerView();
    const gap = 24;
    const cardWidth = reviewsCards[0].offsetWidth + gap;
    const maxIndex = Math.ceil(reviewsCards.length / perView) - 1;

    if (currentReviewIndex < 0) currentReviewIndex = 0;
    if (currentReviewIndex > maxIndex) currentReviewIndex = maxIndex;

    reviewsTrack.style.transform = `translateX(-${currentReviewIndex * cardWidth * perView}px)`;

    updateReviewCards();
    updateReviewDots();
  };

  reviewsPrev.addEventListener("click", () => {
    currentReviewIndex -= 1;
    updateReviewsSlider();
  });

  reviewsNext.addEventListener("click", () => {
    currentReviewIndex += 1;
    updateReviewsSlider();
  });

  window.addEventListener("resize", () => {
    const maxIndex = Math.ceil(reviewsCards.length / getReviewsPerView()) - 1;
    if (currentReviewIndex > maxIndex) currentReviewIndex = maxIndex;

    createReviewDots();
    updateReviewsSlider();
  });

  createReviewDots();
  updateReviewsSlider();
}

const openNailsVideo = document.getElementById("openNailsVideo");
const nailsVideoModal = document.getElementById("nailsVideoModal");
const closeNailsVideo = document.getElementById("closeNailsVideo");
const nailsVideo = document.getElementById("nailsVideo");

if (openNailsVideo && nailsVideoModal && closeNailsVideo && nailsVideo) {
  const openModal = () => {
    nailsVideoModal.classList.add("is-open");
    nailsVideoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-open");

    nailsVideo.currentTime = 0;
    nailsVideo.play();
  };

  const closeModal = () => {
    nailsVideoModal.classList.remove("is-open");
    nailsVideoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("video-open");
    nailsVideo.pause();
    nailsVideo.currentTime = 0;
  };

  openNailsVideo.addEventListener("click", openModal);
  closeNailsVideo.addEventListener("click", closeModal);

  nailsVideoModal.addEventListener("click", (e) => {
    if (e.target === nailsVideoModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nailsVideoModal.classList.contains("is-open")) {
      closeModal();
    }
  });
}
