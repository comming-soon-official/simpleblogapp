const express = require("express");
const blogSchema = require("../models/blogSchema");
const router = express.Router();

//to get draft
router.get("/drafts", async (req, res) => {
  try {
    const posts = await blogSchema.find({ published: false });
    res.send({ success: posts });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
