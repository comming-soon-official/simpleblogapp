const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogs = require("./routes/blogs");
const drafts = require("./routes/drafts");
const draftSchema = require("./models/draftSchema");
const app = express();
const port = 3030;
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/curdblogapp").then((res) => {
  console.log("mongodb started");
});
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/hello", (req, res) => {
  const { title } = req.body;
  res.send(title);
});
app.use("/", blogs);
app.use("/", drafts);
app.listen(port, () => {
  console.log("server is runningin 3030");
});
