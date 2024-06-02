const { createServer } = require("node:http");
const { readFile } = require("node:fs");
const path = require("node:path");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }

  const extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".html":
      contentType = "text/html";
      break;
    case ".js":
      contentType = "application/javascript";
      break;
  }

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
