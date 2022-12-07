const express   = require('express');
const router    = express.Router();;
const shopController = require('../controllers/shop');

//landing page for shop

router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/cart', shopController.postCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders)

module.exports = router;