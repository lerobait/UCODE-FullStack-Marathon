document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const inputString = document.getElementById("inputString").value;
  const selectCharset = Array.from(
    document.getElementById("selectCharset").selectedOptions
  ).map((option) => option.value);

  fetch("/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputString, selectCharset }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("userInput").value = data.inputString;
      document.getElementById("utf-8").value = data.utf;
      document.getElementById("iso").value = data.iso;
      document.getElementById("windows").value = data.windows;

      document.getElementById("userInput").parentNode.style.display = "block";
      document.getElementById("utf-8").parentNode.style.display = data.utf
        ? "block"
        : "none";
      document.getElementById("iso").parentNode.style.display = data.iso
        ? "block"
        : "none";
      document.getElementById("windows").parentNode.style.display = data.windows
        ? "block"
        : "none";
    });
});

document
  .querySelector('button[type="reset"]')
  .addEventListener("click", function () {
    document.getElementById("inputString").value = "";
    document.getElementById("userInput").value = "";
    document.getElementById("utf-8").value = "";
    document.getElementById("iso").value = "";
    document.getElementById("windows").value = "";

    document.getElementById("userInput").parentNode.style.display = "none";
    document.getElementById("utf-8").parentNode.style.display = "none";
    document.getElementById("iso").parentNode.style.display = "none";
    document.getElementById("windows").parentNode.style.display = "none";
  });
