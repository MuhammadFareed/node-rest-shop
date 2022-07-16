const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("./../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((result) => {
      console.log("result :>> ", result);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Data not found for provided id" });
      }
    })
    .catch((error) => {
      console.log("Error while getting all products");
      res.status(500).json({ error });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log("result :>> ", result);
      res.status(201).json({
        message: "Product created successfully.",
        createdProduct: product,
      });
    })
    .catch((error) => {
      console.log("Error while creating product!");
      res.status(500).json({ error });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((result) => {
      console.log("result :>> ", result);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Data not found for provided id" });
      }
    })
    .catch((error) => {
      console.log("Error while getting product by id!");
      res.status(500).json({ error });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log("result :>> ", result);
      if (result) {
        res.status(200).json({ result, message: "Deleted successfully!" });
      } else {
        res.status(404).json({ message: "Data not found for provided id!" });
      }
    })
    .catch((error) => {
      console.log("Error while deleting product of given id!");
      res.status(500).json({ error });
    });
});

module.exports = router;
