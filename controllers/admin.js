const Product = require('../models/_product');

//GET ADD PRODUCTS
exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: 'Edit Product',
        path:'/admin/add-product',
        editing:false
    });
}

//POST ADD PRODUCTS
exports.postAddProduct = (req, res, next) => {
    const title       = req.body.title;
    const imageUrl    = req.body.imageUrl;
    const description = req.body.description;
    const price       = req.body.price;
    const product     = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

//EDIT PRODUCT
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if(!product){
            return res.redirect('/');
        }
        res.render("admin/edit-product", {
            pageTitle: 'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product
        });
    })
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

//POST EDIT PRODUCT

exports.postEditProduct = (req, res, next) => {
  const prodId          = req.body.productId;
  const updatedTitle    = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice    = req.body.price;
  const updatedDescription = req.body.description;
  const updatedproduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedproduct.save();
  res.redirect('/admin/products');
}

//DELETE PRODUCT

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}