const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postController");

// Create a new Post    
router.post("/", postCtrl.create);
  
// Retrieve all Posts
router.get("/", postCtrl.findAll);

// Retrieve all published Posts
router.get("/published", postCtrl.findAllPublished);

// Retrieve a single Post with id
router.get("/:id", postCtrl.findOne);

// Update a Post with id
router.put("/:id", postCtrl.update);

// Delete a Post with id
router.delete("/:id", postCtrl.delete);

// Delete all Posts
router.delete("/", postCtrl.deleteAll);

module.exports = router;

