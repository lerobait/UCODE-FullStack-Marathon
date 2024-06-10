const addImage = (src, alt) => {
  var img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  document.getElementById("images").appendChild(img);
};

window.onload = function () {
  document.getElementById("image-form").onsubmit = function (event) {
    event.preventDefault();

    const link = document.querySelector('input[name="link"]').value;

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        link: link,
      }),
    })
      .then(() => {
        fetch("/images")
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("image-container").style.display = "block";

            addImage(data.Prepared, "Prepared");
            addImage(data.RChannel, "RChannel");
            addImage(data.GChannel, "GChannel");
            addImage(data.BChannel, "BChannel");
          })
          .catch((error) => console.error("Ошибка:", error));
      })
      .catch((error) => console.error("Ошибка:", error));
  };
};
