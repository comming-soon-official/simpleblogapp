const express = require("express");
const blogSchema = require("../models/blogSchema");
const router = express.Router();

router.get("/drafts", async (req, res) => {
  try {
    const posts = await blogSchema.find({ published: false });
    // console.log(posts);
    res.send({ success: posts });
  } catch {
    res.send({ error: "Posts not found" });
  }
});

module.exports = router;
