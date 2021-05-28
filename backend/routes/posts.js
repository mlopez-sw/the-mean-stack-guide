const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middlewares/check-auth");
const extractFile = require("../middlewares/multer");

const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createPost);
// hardcoded posts
router.get("/dummy", PostController.getDummyPosts);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
