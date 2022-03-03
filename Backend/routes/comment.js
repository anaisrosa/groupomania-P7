const express = require("express");
const router = express.Router();

// const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/commentController");

// Create a new Comment
router.post("/", commentCtrl.createComment);

// Retrieve all Comments
router.get("/:postId", commentCtrl.findAllComments);

// Retrieve a single Comment with id
router.get("/find-one/:id", commentCtrl.findOneComment);

// Update a Comment with id
router.put("/:id", commentCtrl.updateComment);

// Report a Comment with id
router.put("/report-comment/:id", commentCtrl.reportComment);

// Delete a Comment with id
router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;
