const categoriesModel = require("../models/categories");

//this function to create categories
const createCategory = (req, res) => {
  const { title } = req.body;

  const newCategory = new categoriesModel({ title });

  newCategory
    .save()
    .then((category) => {
      res.status(201).json({
        success: true,
        message: `Category created`,
        category: category,
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

module.exports = { createCategory };
