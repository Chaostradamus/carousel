export function createCarousel(carouselSelector, options = {}) {
  const carousel = document.querySelector(carouselSelector);
  const slides = carousel.querySelector(".carousel-slides");
  const images = slides.querySelectorAll("img");
  const prevButton = carousel.querySelector(".carousel-btn.prev");
  const nextButton = carousel.querySelector(".carousel-btn.next");
  const dotsContainer = carousel.querySelector(".carousel-dots");

  const totalSlides = images.length;
  let currentSlide = 0;

  // Initialize dots
  function initDots() {
    images.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.dataset.index = index;
      if (index === currentSlide) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    dotsContainer.querySelectorAll("span").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    currentSlide = (slideIndex + totalSlides) % totalSlides; // Wrap around
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function setupEventListeners() {
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    dotsContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN") {
        const slideIndex = parseInt(e.target.dataset.index, 10);
        goToSlide(slideIndex);
      }
    });
  }

  function autoPlay(interval) {
    if (interval) {
      setInterval(nextSlide, interval);
    }
  }

  // Initialize carousel
  function init() {
    initDots();
    goToSlide(0);
    setupEventListeners();
    autoPlay(options.autoPlayInterval || 5000);
  }

  init();
}
