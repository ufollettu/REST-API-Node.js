const mongoose = require("mongoose");
const Order = require("../models/order.server.model");
const Product = require("../models/product.server.model"); // move to controller

//READ
exports.ordersGetAll =  (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate("product", "name")
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    }
                })

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};
//CREATE
exports.orderPost =  (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save() // we don't need promise here
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "order Stored",
                createdOrder: {
                    product: result.product,
                    quantity: result.quantity,
                    orderId: result._id
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};
//GET ONE
exports.orderGetOne =  (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate("product")
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                })
            }
            res.status(200).json({
                order: order,
                requiest: {
                    type: "GET",
                    url: "http://localhost:3000/orders"
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};
//DELETE
exports.orderDelete =  (req, res, next) => {
    Order.remove({_id: req.params.orderId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/orders",
                    body: {
                        productId: "ID",
                        quantity: "Number"
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};