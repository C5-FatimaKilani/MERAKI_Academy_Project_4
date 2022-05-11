const wishListModel = require("../models/wishList");

// This function creates or add new wishList
const createWishList = (req, res) => {
  const { productId } = req.body;

  const newWishList = new wishListModel({
    userId: req.token.userId,
    productId,
  });

  newWishList
    .save()
    .then((result) => {
      wishListModel
        .updateOne({ _id: productId }, { $push: { wishLists: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `wishList added`,
            wishLists: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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

// This function returns the wishLists
const getAllWishLists = (req, res) => {
  const userId = req.token.userId;
  wishListModel
    .find({})
    // .populate("comments")
    .then((wishLists) => {
      if (wishLists.length) {
        res.status(200).json({
          success: true,
          message: `All the wishLists`,
          userId: userId,
          wishLists: wishLists,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No wishLists Yet`,
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

module.exports = { createWishList, getAllWishLists };
