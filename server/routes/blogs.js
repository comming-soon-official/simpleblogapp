const express = require("express");
const blogSchema = require("../models/blogSchema");
const router = express.Router();
const { z } = require("zod");

// creating a schema for strings
const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  discription: z.string(),
  content: z.string(),
  published: z.boolean(),
});

const deleteSchema = z.object({
  id: z.string(),
});
router
  .get("/blogs", async (req, res) => {
    try {
      const posts = await blogSchema.find({ published: true });
      res.send({ success: posts });
    } catch (error) {
      res.send({ error: error });
    }
  })
  .post("/blogs", async (req, res) => {
    try {
      const { title, discription, content, published } = postSchema.parse(
        req.body
      );
      const post = new blogSchema({
        title: title,
        discription: discription,
        content: content,
        published: published,
      });
      await post.save();
      res.send({ success: post });
    } catch (error) {
      res.send({ error: error });
    }
  });

router
  .get("/blogs/:id", async (req, res) => {
    try {
      const { id } = deleteSchema.parse(req.params);
      const post = await blogSchema.findById({ _id: id });
      res.send({ success: post });
    } catch (error) {
      res.send({ error: error });
    }
  })

  .put("/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, discription, content, published } = postSchema.parse(
        req.body
      );
      const post = await blogSchema.findOne({ _id: id });
      post.title = title;
      post.discription = discription;
      post.content = content;
      post.published = published;
      await post.save();
      res.send({ success: post });
    } catch (error) {
      res.send({ error: error });
    }
  });

router.delete("/blogs/:id", async (req, res) => {
  try {
    const { id } = deleteSchema.parse(req.params);
    const hello = await blogSchema.findByIdAndDelete({ _id: id });
    console.log(hello);
    res.send({ success: "Sucessfully Deleted" });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
