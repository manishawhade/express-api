const db = require("../models");
const Product = db.product;
const User = db.user;

const getProducts = async (req, res) => {
  Product.find({})
    .then((result) => {
      res.status(200).json({ productList: result });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error => ${err}` });
    });
};

const createProduct = (req, res) => {
  try {
    const product = new Product(req.body);
    product
      .save()
      .then(async (prod) => {
        const user = await User.findOne({ email: req.user.email });
        if (user) {
          try {
            let courses = user.purchasedCourse;
            var obj = {};
            if (courses && courses.length > 0) {
              obj = { purchasedCourse: [...courses, prod._id] };
            } else {
              obj = { purchasedCourse: [prod._id] };
            }

            User.findByIdAndUpdate(req.user.id, obj);
          } catch (error) {
            console.log("ref error => ", error);
          }
        }
        console.log("Product created successfully.");
        res.status(200).json({ message: `Product created successfully.` });
      })
      .catch((err) => {
        res.status(500).json({ message: `Product creation failed. ${err}` });
      });
  } catch (error) {
    console.log("createProduct Error => ", error);
  }
};

const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.body._id, req.body)
    .then(() => {
      res.status(200).json({ message: `Product updated successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ message: `Product failed. ${err}` });
    });
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.body._id })
    .then(() => {
      res.status(200).json({ message: `Product deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ message: `Delete product failed. ${err}` });
    });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
