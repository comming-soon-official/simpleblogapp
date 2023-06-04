const express = require("express");
const blogSchema = require("../models/blogSchema");
const router = express.Router();
const { z } = require("zod");

// Creating the schema for post data validation
const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  published: z.boolean(),
});

// Creating the schema for delete and get request validation
const deleteSchema = z.object({
  id: z.string(),
});

//performing CRUD operations using the requests on routers
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
      const { title, description, content, published } = postSchema.parse(
        req.body
      );
      const post = new blogSchema({
        title: title,
        description: description,
        content: content,
        published: published,
      });
      await post.save();
      res.send({ success: post });
    } catch (error) {
      res.send({ error: error });
    }
  })
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
      const { title, description, content, published } = postSchema.parse(
        req.body
      );
      const post = await blogSchema.findOne({ _id: id });
      post.title = title;
      post.description = description;
      post.content = content;
      post.published = published;
      await post.save();
      res.send({ success: post });
    } catch (error) {
      res.send({ error: error });
    }
  })
  .delete("/blogs/:id", async (req, res) => {
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
