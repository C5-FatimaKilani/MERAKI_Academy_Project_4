const mongoose = require("mongoose");

const categories = new mongoose.Schema({
  title: { type: String, required: true },
 categoryId: { type:string}
});

module.exports = mongoose.model("Category", categories);