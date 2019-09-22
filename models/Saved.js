
// Get our modules
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let SavedSchema = new Schema({
  savedid: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

let Saved = mongoose.model("Saved", SavedSchema);
module.exports = Saved;