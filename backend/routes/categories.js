const express = require("express");

// Import articles categories
const {createCategory} = require("../controllers/categories");

// Create categories router
const categoriesRouter = express.Router();

categoriesRouter.post("/",createCategory)


module.exports = categoriesRouter;