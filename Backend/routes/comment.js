const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentController");

// Create a new Post    
router.post("/", commentCtrl.createComment);
  
// Retrieve all Posts
router.get("/:postId", commentCtrl.findAllComments);

// Retrieve a single Post with id
router.get("/:id", commentCtrl.findOneComment);

// Update a Post with id
router.put("/:id", commentCtrl.updateComment);

// Report a Post with id
router.put("report/:id", commentCtrl.reportComment);

// Delete a Post with id
router.delete("/:id", commentCtrl.deleteComment);

// Delete all Posts
router.delete("/", commentCtrl.deleteAllComments);

module.exports = router;