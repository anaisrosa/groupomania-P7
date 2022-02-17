const db = require("../models");
const Post = db.Post;
const User = db.User;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.createPost = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Post
  const post = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  };

  // Save Post in the database
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post.",
      });
    });
};

// Retrieve all Posts
exports.findAllPosts = (req, res) => {
  Post.findAll({ include: {
    model: User,
    attributes: ["pseudo"]
    
  } })
    .then((data) => {
      res.send(data);
      
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// Find a single Post with an id
exports.findOnePost = (req, res) => {
  const id = req.params.id;

  Post.findAll({
    where : { id }, 
    include: {
      model: User,
      attributes: ["pseudo"]
      
    } 
  })
    .then((data) => {
      if (data) {
        res.send(data[0]);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

// Update a Post by the id in the request
exports.updatePost = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Post.update(req.body, {
    where: { id: id },
    
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

// Report a Post by the id in the request
exports.reportPost = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Post.update(req.body, {
    where: { id: id },
    
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};

// Delete all Posts from the database.
exports.deleteAllPosts = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Posts.",
      });
    });
};



 