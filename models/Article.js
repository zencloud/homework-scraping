
// Get our modules
const mongoose = require("mongoose");

// Setup the article schema
// This defines how we're going to store the articles we scrape.
const Schema = mongoose.Schema;
let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

let Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
