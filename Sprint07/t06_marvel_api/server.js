const express = require("express");
const crypto = require("crypto");

const app = express();

const config = {
  host: "localhost",
  port: 3000,
  publicKey: "d0cd11a602f649bf5a6407c3b25d0e69",
  privateKey: "58ad540f4fb19650db8348260dc950be5f1d70ad",
};

const callAPI = async () => {
  const fetch = (await import("node-fetch")).default;

  try {
    const timestamp = Date.now().toString();
    const hash = crypto
      .createHash("md5")
      .update(timestamp + config.privateKey + config.publicKey)
      .digest("hex");

    const response = await fetch(
      `http://gateway.marvel.com/v1/public/comics?apikey=${config.publicKey}&hash=${hash}&ts=${timestamp}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", async (req, res) => {
  try {
    const data = await callAPI();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/index.js", (req, res) => {
  res.sendFile(__dirname + "/index.js");
});

app.listen(config.port, config.host, () => {
  console.log(`Server is listening on http://${config.host}:${config.port}`);
});
