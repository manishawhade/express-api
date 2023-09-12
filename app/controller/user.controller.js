const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;
const jwt = require("jsonwebtoken");
const config = require("../config/user.config");

const getUsers = (req, res) => {
  User.find({})
    .populate("purchasedCourse")
    .then((result) => {
      res.status(200).json({ userList: result });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error => ${err}` });
    });
};

const register = (req, res) => {
  try {
    var hashPassword = bcrypt.hashSync(req.body.password, 10);
    let data = {
      ...req.body,
      password: hashPassword,
    };
    const user = new User(data);
    user
      .save()
      .then((usr) => {
        console.log("usr => ", usr._id);
        console.log("User added successfully.");
        res
          .status(200)
          .json({ message: `User added successfully. ${req.body.email}` });
      })
      .catch((err) => {
        res.status(500).json({ message: `Registration failed. ${err}` });
      });
  } catch (error) {
    console.log("register Error => ", error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res.status(401).send({ message: "Invalid Password." });
        return;
      }

      let token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.secret
      );

      res.status(200).json({
        message: {
          token: token,
        },
      });
    } else {
      res.status(404).json({ message: `User not found.` });
    }
  } catch (error) {
    console.log("login Error => ", error);
  }
};

const update = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body)
    .then(() => {
      res.status(200).json({ message: `User updated successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ message: `Update failed. ${err}` });
    });
};

const deleteUser = (req, res) => {
  User.deleteOne({ email: req.user.email })
    .then(() => {
      res.status(200).json({ message: `User deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ message: `Delete user failed. ${err}` });
    });
};

module.exports = {
  getUsers,
  register,
  login,
  update,
  deleteUser,
};
