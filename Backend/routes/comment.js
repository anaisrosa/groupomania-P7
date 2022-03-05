const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const commentCtrl = require("../controllers/commentController");

// Create a new Comment
router.post("/", auth.userCheck, commentCtrl.createComment);

// Retrieve all Comments
router.get("/:postId", auth.userCheck, commentCtrl.findAllComments);

// Retrieve a single Comment with id
router.get("/find-one/:id", commentCtrl.findOneComment);

// Report a Comment with id
router.put("/report-comment/:id", auth.userCheck, commentCtrl.reportComment);

// Athorize a Post with id
router.put("/authorize-comment/:id", auth.adminCheck, commentCtrl.AuthorizeComment);

// Retieve all Reported comments
router.get("/read/reported/list", auth.adminCheck, commentCtrl.findAllReportedComments);

// Delete a Comment with id
router.delete("/:id", auth.userCheck, commentCtrl.deleteComment);

module.exports = router;
