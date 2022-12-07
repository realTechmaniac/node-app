const Product = require('../models/product');

//GET ADD PRODUCTS
exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: 'Add Product',
        path:'/add-product', 
        formCSS:true,
        activeProduct:true,
        productCSS: true
    });
}


//POST ADD PRODUCTS
exports.postAddProduct = (req, res, next) => {
    const title       = req.body.title;
    const imageUrl    = req.body.imageUrl;
    const description = req.body.description;
    const price       = req.body.price;
    const product     = new Product(title, imageUrl, description, price);
    product.save();
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/add-product', 
        formCSS:true, 
        activeProduct:true,
        productCSS: true
    });
}

//GET ADMIN PRODUCTS
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
    res.render('admin/products', {
        prods:products,
        pageTitle : 'Admin Products',
        path: '/admin/products', 
        });
    });
}