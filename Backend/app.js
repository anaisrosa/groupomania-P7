const express = require("express");

const db = require("./models/index")
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

const path = require("path");
const helmet = require("helmet");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post")
const commentRoutes = require("./routes/comment")


const app = express();
app.use(helmet());


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});



app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


module.exports = app;
