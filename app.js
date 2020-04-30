const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.get("/", function (req, res) {});
