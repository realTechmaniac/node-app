const express = require('express');
const path    = require('path');
const router  = express.Router();
const rootDir = require('../utils/path');
const adminController = require('../controllers/admin');

//storing products in a variable:
const products = [];

//admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//admin/products => GET
router.get('/products', adminController.getProducts);

//admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

//edit product
router.post('/edit-product', adminController.postEditProduct);

//admin/add-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

//admin/delete-product => DELETE

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;