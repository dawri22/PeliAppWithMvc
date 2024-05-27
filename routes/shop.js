const express = require("express");
const path = require("path");

const router = express.Router();

const shopController = require("../controllers/ShopController");

router.get("/", shopController.GetIndex);
router.get("/products", shopController.GetProducts);
router.get("/products/:productId", shopController.GetProduct);
router.get("/orders", shopController.GetOrders);
router.post("/products", shopController.GetFilter);




module.exports = router;