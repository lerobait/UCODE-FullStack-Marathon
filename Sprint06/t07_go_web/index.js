const { createServer } = require("node:http");
const { handleNormalRoute } = require("./normal-router");
const { handleQuantumRoute } = require("./quantum-router");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(302, { Location: "/normal" });
    res.end();
    return;
  }

  if (handleNormalRoute(req, res)) {
    return;
  }

  if (handleQuantumRoute(req, res)) {
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/normal`);
});
