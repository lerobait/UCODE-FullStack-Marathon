const express = require("express");
const sharp = require("sharp");
const fs = require("fs");
const ejs = require("ejs");
const request = require("request");
const path = require("path");

const app = express();

const host = "localhost";
const port = 3000;

const tempDir = path.join(__dirname, "temp");

const clearTempFolder = () => {
  if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach((file) => {
      fs.unlinkSync(path.join(tempDir, file));
    });
  }
};

const saveImage = (uri, filename, callback) => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

const changeColor = async (r, g, b, name) => {
  try {
    await sharp(path.join(tempDir, "Origin.png"))
      .tint({ r: r, g: g, b: b })
      .toFile(path.join(tempDir, `${name}.png`));
  } catch (error) {
    console.log(error);
  }
};

app.engine("html", ejs.__express);
app.set("view engine", "html");
app.set("views", __dirname);
app.use(express.static("./"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/images", (req, res) => {
  res.json({
    Prepared: "temp/Prepared.png",
    RChannel: "temp/RChannel.png",
    GChannel: "temp/GChannel.png",
    BChannel: "temp/BChannel.png",
  });
});

app.post("/", async (req, res) => {
  clearTempFolder();
  await saveImage(req.body.link, path.join(tempDir, "Origin.png"), async () => {
    await changeColor(undefined, undefined, undefined, "Prepared");
    await changeColor(255, 0, 0, "RChannel");
    await changeColor(0, 255, 0, "GChannel");
    await changeColor(0, 0, 255, "BChannel");
    res.redirect("/");
  });
});

app.listen(port, host, () =>
  console.log(`Server is listening on http://${host}:${port}`)
);
