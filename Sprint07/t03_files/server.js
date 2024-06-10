const express = require("express");
const app = express();
const path = require("path");
const FileList = require("./FileList");

app.use(express.json());
app.use(express.static(path.join(__dirname, "")));

const host = "localhost";
const port = 3000;

let fileList = new FileList();

app.get("/files", (req, res) => {
  res.json(fileList.getFiles());
});

app.post("/files", (req, res) => {
  const { inputFilename, content } = req.body;
  fileList.createFile(inputFilename, content);
  res.json({ message: "File created" });
});

app.delete("/files/:filename", (req, res) => {
  fileList.deleteFile(req.params.filename);
  res.json({ message: "File deleted" });
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
