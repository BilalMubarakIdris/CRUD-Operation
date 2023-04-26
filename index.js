require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./model/Blog");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URI)
  .then((data) => console.log("MongoDb Connected successfully"))
  .catch((error) => console.log(error));
app.use(express.json());

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/blog", (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  blog
    .save()
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

// get single blog
app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    console.log(error);
  }
});

// Update Single blog
app.patch("/blog/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.title = req.body.title;
  const newBlog = blog.save();
  res.json(newBlog);
  res.send("blog with the Id " + req.params.id + "Updated successfull");

  try {
  } catch (error) {
    console.log(error);
  }
});

// delete single blog
app.delete("/blog/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send("blog with the Id " + req.params.id + "Deleted successfull");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
