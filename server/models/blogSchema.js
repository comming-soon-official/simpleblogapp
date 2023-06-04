const mongoose = require("mongoose");

// Defining the schema for the blogs model
const schema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  published: Boolean,
});

// Creating and exporting the blog model using created schema
module.exports = mongoose.model("blogSchema", schema);
