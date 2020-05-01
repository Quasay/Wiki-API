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

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
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
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully Delete all articles");
      } else {
        res.send(err);
      }
    });
  });

app.route("/articles/:customArticleName").get(function (req, res) {
  const articleName = req.params.customArticleName;

  Article.findOne({ title: articleName }, function (err, result) {
    if (!err) {
      if (!result) {
        res.send("Sorry the requested article is not in our database :(");
      } else {
        res.send(result);
      }
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, function () {
  console.log("Server Started on Port 3000");
});
