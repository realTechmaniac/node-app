const getDb   = require("../utils/database").getDb;
const mongoDb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? mongoDb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products)
        return products;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection("products").find({_id:mongoDb.ObjectId(prodId)})
      .next()
        .then((product) =>  {
            console.log(product, 'single')
            return product;
        })
        .catch((error) => {
            console.log(error);
        });
  }

  static deleteById(prodId){
      const db = getDb();
      return db.collection('products').deleteOne({_id: new mongoDb.ObjectId(prodId)})
      .then((result) => {
        console.log('DELETED PRODUCT')
      }).catch((err) => console.log(err))
  }
}

module.exports = Product;
