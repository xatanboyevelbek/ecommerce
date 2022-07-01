const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop');

router.get('/shop', shopController.shop);
router.get('/shop/checkout', shopController.checkout);
router.get('/shop/cart', shopController.cart);
router.get('/shop/login', shopController.myaccount);
router.get('/shop/shop-detail', shopController.shopdetail);
router.get('/shop/wishlist', shopController.wishlist);

module.exports = router;