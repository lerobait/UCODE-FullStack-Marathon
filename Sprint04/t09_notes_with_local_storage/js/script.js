const formatDate = (date) => {
  const pad = (s) => (s < 10 ? "0" + s : s);
  return `[${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date
    .getFullYear()
    .toString()
    .slice(2)}, ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}]`;
};

document.addEventListener("DOMContentLoaded", (event) => {
  const addButton = document.getElementById("add");
  const clearButton = document.getElementById("clear");
  const textArea = document.getElementById("text");
  const output = document.getElementById("output");

  const setLocalStorage = (name, value) => {
    localStorage.setItem(name, value);
  };

  const getLocalStorage = (name) => {
    return localStorage.getItem(name);
  };

  const checkLocalStorage = () => {
    let notes = getLocalStorage("notes");
    if (notes && notes !== "[Empty]") {
      output.innerHTML = notes;
    } else {
      output.textContent = "[Empty]";
    }
  };

  checkLocalStorage();

  addButton.addEventListener("click", () => {
    if (textArea.value.trim() === "") {
      alert('It\'s empty. Try to input something in "Text input".');
    } else {
      let currentNotes =
        output.textContent === "[Empty]" ? "" : output.innerHTML;
      let newNote = "→ " + textArea.value;
      newNote += " " + formatDate(new Date());
      currentNotes += currentNotes ? "<br>" + newNote : newNote;
      output.innerHTML = currentNotes;
      setLocalStorage("notes", currentNotes);
      textArea.value = "";
    }
  });

  clearButton.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
      output.textContent = "[Empty]";
      setLocalStorage("notes", "[Empty]");
    }
  });
});
