document.addEventListener("DOMContentLoaded", (event) => {
  const info = document.getElementById("info");
  let loadedImagesCount = 0;

  const updateInfo = () => {
    info.textContent = `${loadedImagesCount} images loaded from 20`;
    info.style.backgroundColor = loadedImagesCount === 20 ? "green" : "red";
    if (loadedImagesCount === 20) {
      setTimeout(() => {
        info.style.display = "none";
      }, 3000);
    }
  };

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const loadImage = (img) => {
    if (img.getAttribute("data-loaded") !== "true" && isInViewport(img)) {
      const src = img.getAttribute("data-src");
      if (!src) return;
      img.src = src;
      img.setAttribute("data-loaded", "true");
      loadedImagesCount++;
      updateInfo();
    }
  };

  const images = document.querySelectorAll("img[data-src]");

  function onScrollOrResize() {
    images.forEach(loadImage);
  }
  window.addEventListener("scroll", onScrollOrResize);
  window.addEventListener("resize", onScrollOrResize);

  images.forEach(loadImage);

  updateInfo();
});
