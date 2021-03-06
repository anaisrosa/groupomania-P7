const db = require("../models");
const Comment = db.Comment;
const User = db.User;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.createComment = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  // Create a Comment
  const comment = {
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId
  };

  // Save Comment in the database
  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    });
};

// Retrieve all Comments
exports.findAllComments = (req, res) => {
  Comment.findAll({
    include: {
      model: User,
      attributes: ["pseudo"],
    },
    where : {
      postId : req.params.postId
    }
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

// Find a single Comment with an id
exports.findOneComment = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then((data) => {
      if (data) {
        // console.log("########", data)
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id,
      });
    });
};

// Update a Comment by the id in the request
exports.updateComment = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id,
      });
    });
};

// Delete a Comment with the specified id in the request
exports.deleteComment = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

// Report a Comment by the id in the request
exports.reportComment = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Comment.update(req.body, {
    where: { id: id },
    
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id,
      });
    });
};

// Authorize a Comment by the id in the request
exports.AuthorizeComment = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Comment.update(req.body, {
    where: { id: id },
    
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was authorized successfully.",
        });
      } else {
        res.send({
          message: `Cannot authorize Comment with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error authorizing Comment with id=" + id,
      });
    });
};

// Retrieve all Reported Comments
exports.findAllReportedComments = (req, res) => {
  Comment.findAll({
    where : { reported : true }, 
    include: {
      model: User,
      attributes: ["pseudo"]
      
    }
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reported comments.",
      });
    });
};

// Delete a Comment with the specified id in the request
exports.deleteReportedComment = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete comment with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

