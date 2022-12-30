const Product = require("../models/product");
const Cart = require("../models/cart");

//GET PRODUCTS
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    }) .catch((error) => {
        console.log(error);
    })
};

//GET SINGLE PRODUCT
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
        res.render("shop/product-detail", {
            product: product,
            pageTitle: product.title,
            path: "/products",
        });
    }).catch(error => console.log(error))
};

//SHOP INDEX
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};


//CART
exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then((products) => {
      console.log(products);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    }).catch((err) => console.log(err))
};


//POST CART
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then((product) => {
     return req.user.addToCart(product)
  }).then((result) => {
     console.log(result);
     res.redirect('/cart');
  })
  .catch((error) => {
    console.log(error);
  });
};

//CHECKOUT
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

//ORDERS
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

//DELETE CART ITEM
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId)
    .then((result) => {
      console.log(result)
       res.redirect('/cart')
    }).catch((err) => {
      console.log(err)
    })
};

