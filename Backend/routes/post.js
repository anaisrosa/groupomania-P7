const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
const postCtrl = require("../controllers/postController");

// Create a new Post
router.post("/", postCtrl.createPost);

// Retrieve all Posts
router.get("/", postCtrl.findAllPosts);

// Retrieve a single Post with id
router.get("/:id", postCtrl.findOnePost);

// Update a Post with id
router.put("/:id", postCtrl.updatePost);

// Report a Post with id
router.put("/report-post/:id", postCtrl.reportPost);

// Delete a Post with id
router.delete("/:id", postCtrl.deletePost);

module.exports = router;
