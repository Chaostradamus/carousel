export function createCarousel(
  carouselContainerSelector,
  slideInterval = 5000
) {
  const container = document.querySelector(carouselContainerSelector);
  const slides = container.querySelectorAll(".carousel-slide");
  const prevButton = container.querySelector(".carousel-prev");
  const nextButton = container.querySelector(".carousel-next");
  const dotsContainer = container.querySelector(".carousel-dots");
  let currentIndex = 0;
  let intervalId;

  // 1. Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // 2. Update slides and dots visibility
  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
    });

    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // 3. Move to the next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  // 4. Move to the previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // 5. Go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // 6. Start the auto-rotation
  function startAutoSlide() {
    intervalId = setInterval(nextSlide, slideInterval);
  }

  // 7. Stop the auto-rotation
  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // Attach event listeners
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);

  // Initialize carousel
  updateCarousel();
  startAutoSlide();
}
