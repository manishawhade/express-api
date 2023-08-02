const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;
const getUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.status(200).json({ userList: result });
    })
    .catch((err) => {
      res.status(500).json({ message: `Registration failed. Error => ${err}` });
    });
};

const register = (req, res) => {
  try {
    var hashPassword = bcrypt.hashSync(req.body.password, 10);
    let data = {
      ...req.body,
      password: hashPassword,
    };
    User.insertMany([data])
      .then(() => {
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
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res.status(401).send({ message: "Invalid Password." });
        return;
      }

      const { id, name, email } = user;
      res.status(200).json({
        message: {
          id,
          name,
          email,
        },
      });
    } else {
      res.status(404).json({ message: `User not found.` });
    }
  } catch (error) {
    console.log("login Error => ", error);
  }
};

module.exports = {
  getUsers,
  register,
  login,
};
