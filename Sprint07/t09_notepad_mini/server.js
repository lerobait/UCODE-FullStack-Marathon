const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const host = "localhost";
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/note", (req, res) => {
  const { name, importance, content } = req.body;
  const date = new Date().toISOString();
  const note = { name, importance, content, date };

  fs.readFile("notes.json", "utf8", (err, data) => {
    if (err) {
      fs.writeFile("notes.json", JSON.stringify([note]), (err) => {
        if (err) throw err;
        console.log("Note saved successfully!");
        res.sendStatus(200);
      });
    } else {
      const notes = JSON.parse(data);
      notes.push(note);
      fs.writeFile("notes.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log("Note saved successfully!");
        res.sendStatus(200);
      });
    }
  });
});

app.get("/notes", (req, res) => {
  fs.readFile("notes.json", "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("No notes found.");
        return res.json([]);
      } else {
        throw err;
      }
    }

    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.get("/notes/:index", (req, res) => {
  const index = req.params.index;
  fs.readFile("notes.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const note = notes[index];
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.json(note);
  });
});

app.delete("/note/:index", (req, res) => {
  const index = req.params.index;

  fs.readFile("notes.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.splice(index, 1);
    fs.writeFile("notes.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("Note deleted successfully!");
      res.sendStatus(200);
    });
  });
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
