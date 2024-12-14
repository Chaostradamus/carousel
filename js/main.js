import { createCarousel } from "./carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  createCarousel(".carousel", { autoPlayInterval: 5000 });
});
