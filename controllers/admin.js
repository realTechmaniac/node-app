const Product = require('../models/product');
const mongoDb = require('mongodb');

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
    const product     = new Product(title,price,description, imageUrl);
    product.save().then((result) => {
        console.log('Created product')
        res.redirect('/admin/products')
    }).catch((error) => {
        console.log(error);
    });
}

//EDIT PRODUCT
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if(!product){
                return res.redirect('/');
            }
            res.render("admin/edit-product", {
                pageTitle: 'Edit Product',
                path:'/admin/edit-product',
                editing:editMode,
                product:product
            });
        }).catch(error => {
            console.log(error);
    })
  
}

//GET ADMIN PRODUCTS
exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then((products) => {
        res.render('admin/products', {
            prods:products,
            pageTitle : 'Admin Products',
            path: '/admin/products', 
        });
    }).catch((error) => {
        console.log(error)
    })
   }

//POST EDIT PRODUCT

exports.postEditProduct = (req, res, next) => {
  const prodId             = req.body.productId;
  const updatedTitle       = req.body.title;
  const updatedImageUrl    = req.body.imageUrl;
  const updatedPrice       = req.body.price;
  const updatedDescription = req.body.description;
  const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl,  prodId);
  product.save()
        .then((result) => {
            console.log('UPDATED PRODUCTS');
            res.redirect('/admin/products');
        }).catch((err) => console.log(err))
}

//DELETE PRODUCT
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId)
    Product.deleteById(prodId)
        .then((result) => { 
            console.log('success');
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err)
        })
    
}