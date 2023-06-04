const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogs = require("./routes/blogs");
const drafts = require("./routes/drafts");

const app = express();
const port = 3030;

// Enabling CORS
app.use(cors());

// Parsing JSON request to body
app.use(express.json());

// Connecting to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/curdblogapp").then((res) => {
  console.log("MongoDB started");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", blogs);

app.use("/", drafts);

// Starting the server
app.listen(port, () => {
  console.log("Server is running on port 3030");
});
