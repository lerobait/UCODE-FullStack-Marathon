document.addEventListener("DOMContentLoaded", (event) => {
  const stones = document.querySelectorAll(".stone");

  stones.forEach((stone) => {
    stone.addEventListener("click", function () {
      const draggable = this.getAttribute("value") === "on";
      if (draggable) {
        this.setAttribute("value", "off");
        this.style.border = "3px dashed black";
      } else {
        this.setAttribute("value", "on");
        this.style.border = "none";
      }
    });

    stone.addEventListener("mousedown", function (e) {
      if (this.getAttribute("value") === "on") {
        const offsetX = e.clientX - this.getBoundingClientRect().left;
        const offsetY = e.clientY - this.getBoundingClientRect().top;

        const onMouseMove = (e) => {
          this.style.position = "absolute";
          this.style.left = e.clientX - offsetX + "px";
          this.style.top = e.clientY - offsetY + "px";
        };

        document.addEventListener("mousemove", onMouseMove);

        this.addEventListener(
          "mouseup",
          () => {
            document.removeEventListener("mousemove", onMouseMove);
          },
          { once: true }
        );
      }
    });
  });
});
