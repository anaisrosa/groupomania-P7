const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/postController");

// Create a new Post
router.post("/", auth.userCheck, postCtrl.createPost);

// Retrieve all Posts
router.get("/", auth.userCheck, postCtrl.findAllPosts);

// Retrieve a single Post with id
router.get("/:id", auth.userCheck, postCtrl.findOnePost);

// Update a Post with id
router.put("/:id", postCtrl.updatePost);

// Athorize a Post with id
router.put("/authorize-post/:id",auth.adminCheck, postCtrl.AuthorizePost);

// Report a Post with id
router.put("/report-post/:id", auth.userCheck, postCtrl.reportPost);

// Retieve all Reported posts
router.get("/read/reported/list", auth.adminCheck, postCtrl.findAllReportedPosts);

// Delete a Post with id
router.delete("/:id", auth.userCheck, postCtrl.deletePost);

module.exports = router;
