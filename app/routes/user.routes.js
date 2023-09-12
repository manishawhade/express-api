const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const {
  checkIfUserAlreadyExists,
  verifyToken,
} = require("../middlewares/user.middleware");

router.post("/login", controller.login);

router.post("/register", checkIfUserAlreadyExists, controller.register);

router.use(verifyToken);

router.get("/getUsers", controller.getUsers);

router.post("/update", controller.update);

router.post("/delete", controller.deleteUser);

module.exports = router;
