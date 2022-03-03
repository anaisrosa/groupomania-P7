const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

// Create new user //
exports.signup = (req, res, next) => {
  const isAdmin = req.body.password == process.env.ADMIN_PASSWORD ? true : false;
  bcrypt
    .hash(req.body.password, 10)
    .then(async (hash) => {
      try {
        const user = await User.create({
          pseudo: req.body.pseudo,
          email: req.body.email,
          isAdmin: isAdmin,
          password: hash,
        });
        res.status(201).json({ message: "Utilisateur créé !", user });
      } catch (error) {
        res.status(400).json({ error });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connect user //
exports.login = (req, res, next) => {
  User.findAll({
    where: {
      pseudo: req.body.pseudo,
    },
  })
    .then((data) => {
      if (data.length === 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      const user = data[0].dataValues;
      bcrypt
        .compare(req.body.password, user.password)

        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign({ userIsAdmin: user.isAdmin }, process.env.JWT_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          return res.status(501).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Find user account //
exports.findOneAccount = (req, res) => {
  const id = req.params.id;

  User.findAll({
    where: { id },
  })
    .then((data) => {
      if (data) {
        res.send(data[0]);
      } else {
        res.status(404).send({
          message: `Cannot find  Account with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Account with id=" + id,
      });
    });
};

// Compare password //
exports.comparePassword = (req, res, next) => {
  User.findAll({
    where: {
      pseudo: req.body.pseudo,
    },
  })
    .then((data) => {
      if (data.length === 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      const user = data[0].dataValues;
      bcrypt
        .compare(req.body.password, user.password)

        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            message: "success",
          });
        })
        .catch((error) => {
          return res.status(501).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Update user account //
exports.updateAccount = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  let updateData = {};
  if (req.body.pseudo) {
    updateData.pseudo =req.body.pseudo
  } else if (req.body.email) {
    updateData.email =req.body.email
  } else if (req.body.password) {
   const hash = await bcrypt.hash(req.body.password, 10)
   updateData.password = hash;
  } else { 
    return res.status(403).send({ message: "Error updating User with id=" + id,
  });
}
  User.update(updateData, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(501).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
