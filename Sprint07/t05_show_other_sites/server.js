const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const host = "localhost";
const port = 3000;

app.use(express.static(path.join(__dirname, "")));

app.get("/fetch-url", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await axios.get(url);
    const bodyContent = response.data.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    res.send(bodyContent ? bodyContent[1] : "No body content found");
  } catch (error) {
    res.status(500).send("Error fetching the URL");
  }
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
