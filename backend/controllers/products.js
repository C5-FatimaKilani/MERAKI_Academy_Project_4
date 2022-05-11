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

// This function get's All Products
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

// This function updates product by its id
const updateProductById = (req, res) => {
    const _id = req.params.id;
  
    productsModel
      .findByIdAndUpdate(_id, req.body, { new: true })
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: `The Product: ${_id} is not found`,
          });
        }
        res.status(202).json({
          success: true,
          message: `Product updated`,
          product: result,
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

  // This function deletes a specific product by its id
const deleteProductById = (req, res) => {
    const id = req.params.id;
    productsModel
      .findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: `The Product: ${id} is not found`,
          });
        }
        res.status(200).json({
          success: true,
          message: `Product deleted`,
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

module.exports = {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById
};
