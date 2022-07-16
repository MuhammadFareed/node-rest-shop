const express = require("express");
const app = express();
const morgan = require("morgan");
const bordyParser = require("body-parser");
const mongoose = require("mongoose");

const apiRoutesForProducts = require("./api/routes/products");
const apiRoutesForOrders = require("./api/routes/orders");

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0.kaf0xt7.mongodb.net/?retryWrites=true&w=majority`
);

app.use(morgan("dev"));
app.use(bordyParser.urlencoded({ extended: true }));
app.use(bordyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle request
app.use("/products", apiRoutesForProducts);
app.use("/orders", apiRoutesForOrders);

// Handling errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
