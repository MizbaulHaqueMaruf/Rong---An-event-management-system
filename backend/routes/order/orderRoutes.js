const router = require("express").Router();
const orderController = require("../../controllers/order/orderController");

router.get("/seller/orders/:sellerId", orderController.get_seller_orders);
router.get("/seller/order/:orderId", orderController.get_seller_order);

module.exports = router;
