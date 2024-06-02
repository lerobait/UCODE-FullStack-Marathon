const path = require("node:path");
const ejs = require("ejs");

const calculateTime = () => {
  const currentDate = new Date();
  const startDate = new Date("1939-01-01");

  const diffInTime = Math.abs(currentDate - startDate);
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffInDays / 64);
  const months = Math.floor((diffInDays % 64) / 5);
  const days = (diffInDays % 64) % 5;

  return [years, months, days];
};

const handleQuantumRoute = (req, res) => {
  if (req.url === "/quantum") {
    const [years, months, days] = calculateTime();
    const renderOptions = { years, months, days };
    const filePath = path.join(__dirname, "views", "quantum.ejs");

    ejs.renderFile(filePath, renderOptions, (err, str) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(str);
    });

    return true;
  }

  return false;
};

module.exports = { handleQuantumRoute };
