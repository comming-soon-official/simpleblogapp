const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  discription: String,
  content: String,
  published: Boolean,
});

module.exports = mongoose.model("blogSchema", schema);
