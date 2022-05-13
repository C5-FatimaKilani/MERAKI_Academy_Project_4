const mongoose = require("mongoose");

const categories = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true }
 
});

module.exports = mongoose.model("Category", categories);