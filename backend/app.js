const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://test-admin:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.eeeix.mongodb.net/mean-course-db?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed");
    console.log("----------------");
    console.log(error);
  });

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next();
// });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// allow requests to image folder (otherwise its forbidden)
// make sure that req to images are forwarded to backend/images
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
