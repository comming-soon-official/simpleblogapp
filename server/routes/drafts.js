const express = require("express");
const postSchema = require("../models/postSchema");
const router = express.Router();

router.get("/drafts", async (req, res) => {
  try {
    const posts = await blogSchema.find({ published: false });
    res.send({ success: posts });
  } catch {
    res.send({ error: "Posts not found" });
  }
});

module.exports = router;
