const express = require("express");
require("dotenv").config();
const userRouter = require("./app/routes/user.routes");
const db = require("./app/models");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Mongodb connection failed Error => ", err);
  });

//Routes
app.use("/users", userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
