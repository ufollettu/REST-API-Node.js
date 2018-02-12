const express = require("express");
const router = express.Router();
const products = require("../controllers/products.server.controller");

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "get req to /products"
    });
});

router.post("/", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: "post req to /products",
        createdProduct: product
    });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if (id === "special") {
        res.status(200).json({
            message: "special id",
            id: id
        });
    } else {
        res.status(200).json({
            message: "not so spacial"
        });
    }
});

router.patch("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "updated product"
    });
});

router.delete("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "deleted product"
    });
});

module.exports = router;