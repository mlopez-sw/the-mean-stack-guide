const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://test-admin:SZ1JrMRL5cmwyZ90@cluster0.eeeix.mongodb.net/mean-course-db?retryWrites=true&w=majority"
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
