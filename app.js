const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
  Article.find(function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

app.post("/articles", function (req, res) {
  const newTitle = req.body.title;
  const newContent = req.body.content;

  const newArticle = new Article({
    title: newTitle,
    content: newContent,
  });

  newArticle.save(function (err) {
    if (!err) {
      res.send("It worked!");
    } else {
      res.send("Something went wrong :(");
      res.send(err);
    }
  });
});

app.delete("/articles", function (req, res) {
  Article.deleteMany(function (err) {
    if (!err) {
      res.send("Successfully Delete all articles");
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, function () {
  console.log("Server Started on Port 3000");
});
