document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form[name="showHTML"]');
  const input = document.getElementById("url");
  const displayedURL = document.getElementById("displayedURL");
  const urlContent = document.getElementById("urlContent");
  const clearButton = document.getElementById("clearButton");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = input.value;

    if (url) {
      fetch(`/fetch-url?url=${encodeURIComponent(url)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          displayedURL.textContent = url;
          urlContent.innerHTML = escapeHTML(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          urlContent.textContent = "Error fetching the URL";
        });
    }
  });

  clearButton.addEventListener("click", function () {
    input.value = "";
    displayedURL.textContent = "Type an URL...";
    urlContent.innerHTML = "";
  });

  const escapeHTML = (html) => {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  };
});
