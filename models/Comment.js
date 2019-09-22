let mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;
let CommentSchema = new Schema({
    commentBody: String
});

// This creates our model from the above schema, using mongoose's model method
let Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;
