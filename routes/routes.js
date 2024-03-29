/// Scraping App Routes

// Get our modules
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

mongoose.set('useFindAndModify', true);

module.exports = function (app) {

    // Main Page
    app.get('/', function (req, res) {
        res.render('home');
    });

    // Clear database
    app.get('/clear', function (req, res) {
        db.Article.find({})
            .remove()
            .then(function () {
                res.send("Cleared!");
            });
    });

    // Scrape
    app.get("/scrape", function (req, res) {

        // Load data from remote url
        axios.get("http://www.echojs.com/").then(function (response) {

            // Setup cheerio to parse data so we can dig through it
            var $ = cheerio.load(response.data);

            // Articles with H2
            $("article h2").each(function (i, element) {

                // Setup result
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");

                // Add article to database
                db.Article.create(result)
                    .then((dbArticle) => { console.log(dbArticle); })
                    .catch((error) => { console.log(error); });
            });

            // Send a message to the client
            res.send("Scrape Complete");
        });
    });

    // Articles route
    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });


    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/saved", function (req, res) {
        db.Saved.find({})
        .then(function(savedArticles){
            
            let savedList = []
            savedArticles.forEach((articleID) => {
                savedList.push(articleID.savedid);
            });

            db.Article.find({}).where('_id')
            .in(savedList)
            .populate("comment")
            .exec((error, articleData) => {
                res.json(articleData);
            });
        });
    });

    // Save Article ID
    app.post("/save/:id", function (req, res) {
        db.Saved.create({ savedid: req.params.id })
            .then(res.send("Added!"));
    });

    app.post("/unsave/:id", function(req, res) {
        db.Saved.deleteOne({savedid: req.params.id})
        .then (function(data){
            res.json(data);
        });
    });

    app.post("/comment/save/:id", function (req, res) {
        console.log(req.body);
        db.Comment.create(req.body)
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}

