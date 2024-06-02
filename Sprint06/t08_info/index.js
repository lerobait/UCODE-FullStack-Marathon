const { createServer } = require("node:http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  console.log("Name of executed script:", __filename);
  console.log("Arguments passed to the script:", process.argv.slice(2));
  console.log("IP address of the server:", server.address().address);
  console.log(
    "Name of host that invokes the current script:",
    req.headers.host
  );
  console.log("Name of version of the information protocol:", req.httpVersion);
  console.log("Query method:", req.method);
  console.log("User-Agent information:", req.headers["user-agent"]);
  console.log("IP address of the client:", req.socket.remoteAddress);
  console.log("List of parameters passed by URL:", parsedUrl.query);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Check console :)\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}?isSprint06=true`);
});
