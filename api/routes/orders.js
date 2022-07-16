const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /orders",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST requests to /orders",
  });
});

router.delete("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling DELETE requests to /orders",
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID",
      id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID",
      id,
    });
  }
});

module.exports = router;
