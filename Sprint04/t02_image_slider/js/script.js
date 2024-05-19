document.addEventListener("DOMContentLoaded", (event) => {
  const slideContainer = document.getElementById("slides-wrapper");
  let currentSlide = 1;
  const totalSlides = 22;

  const createSlide = (slideNumber) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    img.alt = `page ${slideNumber}`;
    img.src = `assets/images/${String(slideNumber).padStart(2, "0")}.jpg`;
    slide.appendChild(img);
    return slide;
  };

  const updateSlider = (slideNumber) => {
    slideContainer.innerHTML = "";
    slideContainer.appendChild(createSlide(slideNumber));
  };

  const nextSlide = () => {
    currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    updateSlider(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    updateSlider(currentSlide);
  };

  document.querySelector(".prev-button").addEventListener("click", prevSlide);
  document.querySelector(".next-button").addEventListener("click", nextSlide);

  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  const startSlideShow = () => {
    slideInterval = setInterval(nextSlide, 3000);
  };

  prevButton.addEventListener("mouseleave", startSlideShow);
  nextButton.addEventListener("mouseleave", startSlideShow);

  const stopSlideShow = () => {
    clearInterval(slideInterval);
  };

  prevButton.addEventListener("mouseenter", stopSlideShow);
  nextButton.addEventListener("mouseenter", stopSlideShow);

  slideContainer.addEventListener("mouseenter", stopSlideShow);
  slideContainer.addEventListener("mouseleave", startSlideShow);

  startSlideShow();
  updateSlider(currentSlide);
});
