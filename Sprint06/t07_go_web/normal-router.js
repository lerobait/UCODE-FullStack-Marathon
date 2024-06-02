const path = require("node:path");
const ejs = require("ejs");

const calculateTime = () => {
  const currentDate = new Date();
  const startDate = new Date("1939-01-01");

  const diffInTime = Math.abs(currentDate - startDate);
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffInDays / 365);
  const months = Math.floor((diffInDays % 365) / 30);
  const days = (diffInDays % 365) % 30;

  return {
    years: () => years,
    months: () => months,
    days: () => days,
  };
};

const handleNormalRoute = (req, res) => {
  if (req.url === "/normal") {
    const normalTime = calculateTime();
    const renderOptions = {
      years: normalTime.years(),
      months: normalTime.months(),
      days: normalTime.days(),
    };
    const filePath = path.join(__dirname, "views", "normal.ejs");

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

module.exports = { handleNormalRoute };
