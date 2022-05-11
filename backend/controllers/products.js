const productsModel = require("../models/products");

// This function creates new article
const createProduct = (req, res) => {
  const { title, description, price,categoryId } = req.body;

  console.log("A'm toooooken a'm heeere" + req.token);

  const newProduct = new productsModel({
    title,
    description,
    price,
    categoryId,
    userId: req.token.userId,
    
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: `Product created`,
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const getAllProducts = (req, res) => {
    const userId = req.token.userId;

    productsModel
    .find({})
    // .populate("comments categoryId")
    .then((products) => {
      if (products.length) {
        res.status(200).json({
          success: true,
          message: `All the products`,
          userId: userId,
          products: products,
          comments: products.comments,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Products Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  createProduct,
  getAllProducts,
};
