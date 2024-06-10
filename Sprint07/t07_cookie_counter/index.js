document.addEventListener("DOMContentLoaded", () => {
  fetch("/count")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("count").textContent = data.count;
    })
    .catch((error) => {
      console.error("Error fetching the count:", error);
    });
});
