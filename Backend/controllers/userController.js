const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then( async (hash) => {
      try {
      const user = await User.create({ 
        pseudo: req.body.pseudo, 
        email: req.body.email,
        password: hash
      });
      res.status(201).json({ message: "Utilisateur créé !", user })
    }
    catch( error ){
      res.status(400).json ({ error })
    };

    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  
  User.findAll({
    where: {
      pseudo: req.body.pseudo
    }
  })
    .then((data) => {
      if (data.length === 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      const user = data[0].dataValues
      bcrypt
        .compare(req.body.password, user.password)
        
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          
          return res.status(501).json({ error })
        });
    })
    .catch((error) => res.status(500).json({ error }));
};
