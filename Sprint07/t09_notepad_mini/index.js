document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const noteList = document.getElementById("note-list");
  const currentNoteName = document.getElementById("current-note-name");
  const currentNoteInfo = document.getElementById("current-note-info");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("user-name").value;
    const importance = document.getElementById("importance").value;
    const content = document.getElementById("user-text").value;

    fetch("/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, importance, content }),
    })
      .then(() => {
        form.reset();
        fetchNotes();
      })
      .catch((error) => console.error("Error:", error));
  });

  const fetchNotes = () => {
    fetch("/notes")
      .then((response) => response.json())
      .then((data) => {
        noteList.innerHTML = "";
        const listContainer = document.createElement("ul");
        data.forEach((note, index) => {
          const listItem = document.createElement("li");
          const noteLink = document.createElement("a");
          noteLink.href = "#";
          noteLink.textContent = `${note.date} > ${note.name}`;
          noteLink.dataset.index = index;
          listItem.appendChild(noteLink);
          listItem.innerHTML += ` <a href="javascript:void(0);" class="delete-note" data-index="${index}">DELETE</a>`;
          listContainer.appendChild(listItem);
        });
        noteList.appendChild(listContainer);

        listContainer.addEventListener("click", (event) => {
          if (event.target.tagName === "A") {
            const index = event.target.dataset.index;
            viewNoteDetails(index);
          }
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  const viewNoteDetails = (index) => {
    fetch(`/notes/${index}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        currentNoteName.textContent = `Detail of "${data.name}"`;
        const listContainer = document.createElement("ul");
        listContainer.innerHTML = `
          <li>Date: ${data.date}</li>
          <li>Name: ${data.name}</li>
          <li>Importance: ${data.importance}</li>
          <li>Content: ${data.content}</li>
        `;
        currentNoteInfo.innerHTML = "";
        currentNoteInfo.appendChild(listContainer);
      })
      .catch((error) => console.error("Error:", error));
  };

  noteList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-note")) {
      const index = event.target.dataset.index;
      fetch(`/note/${index}`, { method: "DELETE" })
        .then(() => fetchNotes())
        .catch((error) => console.error("Error:", error));
    }
  });

  fetchNotes();
});
