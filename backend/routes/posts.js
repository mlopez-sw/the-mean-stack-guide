const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  //   const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  // console.log(post);
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

// hardcoded posts
router.get("/dummy", (req, res, next) => {
  //   res.send("Hi from Express");
  const posts = [
    {
      id: "asdjkla324",
      title: "Server-side post",
      content: "Coming from server",
    },
    {
      id: "asdjlk32a2",
      title: "Second Server-side post",
      content: "Coming from server too!",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    // console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    // console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.delete("/:id", (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    // console.log(result);
    res.status(200).json({
      message: "Posts deleted successfully!",
    });
  });
});

module.exports = router;
