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
router.put("/:id", auth.userCheck, postCtrl.updatePost);

// Delete a Post with id
router.delete("/:id", auth.userCheck, postCtrl.deletePost);

// Report a Post with id
router.put("/report-post/:id", auth.userCheck, postCtrl.reportPost);

// Athorize a Post with id
router.put("/authorize-post/:id",auth.adminCheck, postCtrl.AuthorizePost);

// Retieve all Reported posts
router.get("/read/reported/list", auth.adminCheck, postCtrl.findAllReportedPosts);

// Delete a Reported Post with id
router.delete("/delete/reported-post/:id", auth.adminCheck, postCtrl.deleteReportedPost);


module.exports = router;
