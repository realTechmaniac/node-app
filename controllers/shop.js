const Product = require('../models/product');

//GET PRODUCTS
exports.getProducts = (req, res, next) => {
   Product.fetchAll((products) => {
    res.render('shop/product-list', {
        prods:products,
        pageTitle : 'All Products',
        path: '/products', 
     });
   });
}


//GET SINGLE PRODUCT
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
       res.render('shop/product-detail', {
        product:product,
        pageTitle:product.title,
        path:"/products"
       })
    });
}

//SHOP INDEX
exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
    res.render('shop/index', {
        prods:products,
        pageTitle : 'Shop',
        path: '/', 
        });
    });
}


//CART
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path:"/cart",
        pageTitle:"Your Cart"
    });
}

//POST CART
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    res.redirect('/cart');
}


//CHECKOUT
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path:"/checkout",
        pageTitle:"Checkout"
    });
}


//ORDERS
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path : "/orders",
        pageTitle:"Your Orders"
    })
}