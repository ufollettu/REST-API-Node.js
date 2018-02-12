const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const orders = require("../controllers/orders.server.controller");

router.get("/", middleware.checkAuth, orders.ordersGetAll);
router.post("/", middleware.checkAuth, orders.orderPost);
router.get("/:orderId", middleware.checkAuth, orders.orderGetOne);
router.delete("/:orderId", middleware.checkAuth, orders.orderDelete);

module.exports = router;
