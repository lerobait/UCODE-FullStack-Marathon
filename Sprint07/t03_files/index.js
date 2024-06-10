document.getElementById("createFile").addEventListener("click", async (e) => {
  e.preventDefault();
  const inputFilename = document.getElementById("inputFilename").value;
  const content = document.getElementById("content").value;
  await fetch("/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputFilename, content }),
  });
  loadFiles();
});

document.getElementById("deleteFile").addEventListener("click", async (e) => {
  e.preventDefault();
  const filename = document.getElementById("filename").textContent;
  await fetch(`/files/${filename}`, {
    method: "DELETE",
  });
  loadFiles();
});

const loadFiles = async () => {
  const res = await fetch("/files");
  const files = await res.json();
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  const ul = document.createElement("ul");
  files.forEach((file) => {
    const link = document.createElement("a");
    link.textContent = file.filename;
    link.href = "#";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("file").style.display = "block";
      document.getElementById("filename").textContent = file.filename;
      document.getElementById("fileContent").textContent = file.content;
    });
    const li = document.createElement("li");
    li.appendChild(link);
    ul.appendChild(li);
  });
  fileList.appendChild(ul);
};

loadFiles();
