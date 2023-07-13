const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/usersRoutes");
const postRoutes = require("./routes/postsRoutes");
const commentRoutes = require("./routes/commentsRoutes");

app.use(express.json());

const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Succesfully connected to the db");
  })
  .catch((err) => {
    console.log("Error while connecting to the db", err);
  });

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
