const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postController");

// Create a new Post    
router.post("/", postCtrl.createPost);
  
// Retrieve all Posts
router.get("/", postCtrl.findAllPosts);

// Retrieve a single Post with id
router.get("/:id", postCtrl.findOnePost);

// Update a Post with id
router.put("/:id", postCtrl.updatePost);

// Delete a Post with id
router.delete("/:id", postCtrl.deletePost);

// Delete all Posts
router.delete("/", postCtrl.deleteAllPosts);

module.exports = router;

