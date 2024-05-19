document.addEventListener("DOMContentLoaded", (event) => {
  const addButton = document.getElementById("add");
  const clearButton = document.getElementById("clear");
  const textArea = document.getElementById("text");
  const output = document.getElementById("output");

  const setCookie = (name, value, daysToLive) => {
    const date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie =
      name +
      "=" +
      value.replace(/;/g, "").replace(/<br>/g, "\\n") +
      ";" +
      expires +
      ";path=/";
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0)
        return c.substring(nameEQ.length).replace(/\\n/g, "<br>");
    }
    return null;
  };

  const checkCookie = () => {
    let notes = getCookie("notes");
    if (notes && notes !== "[Empty]") {
      output.innerHTML = notes;
    } else {
      output.textContent = "[Empty]";
    }
  };

  checkCookie();

  addButton.addEventListener("click", () => {
    if (textArea.value.trim() === "") {
      alert('It\'s empty. Try to input something in "Text input".');
    } else {
      let currentNotes =
        output.textContent === "[Empty]" ? "" : output.innerHTML;
      let newNote = "→ " + textArea.value;
      currentNotes += currentNotes ? "<br>" + newNote : newNote;
      output.innerHTML = currentNotes;
      setCookie("notes", currentNotes, 30);
      textArea.value = "";
    }
  });

  clearButton.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
      output.textContent = "[Empty]";
      setCookie("notes", "[Empty]", 30);
    }
  });
});
