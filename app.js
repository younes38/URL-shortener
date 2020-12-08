const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const ShortURL = require("./models/shortURL");

const app = express();

const databseURI = "";
mongoose
  .connect(databseURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected");
    app.listen(3000);
  });

// view
app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  console.log("here");
  const shortURLs = await ShortURL.find();
  res.render("index", { shortURLs });
});

app.post("/shortURLs", async (req, res) => {
  try {
    await ShortURL.create({
      full: req.body.fullURL,
    });
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

app.get("/:short", async (req, res) => {
  const shortURL = await ShortURL.findOne({ short: req.params.short });
  if (shortURL == null) return res.sendStatus(404);
  shortURL.clicks++;
  shortURL.save();
  res.redirect(shortURL.full);
});
