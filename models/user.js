const getDb = require("../utils/database").getDb;
const mongoDb = require("mongodb");

class User {
  constructor(id, username, email, cart) {
    this._id = id;
    this.name = username;
    this.email = email;
    this.cart = cart; //{items : [{}]}
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("user added");
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((item) => {
        return item.productId.toString() === product._id.toString();
    });
    let updatedQty = 1;
    let updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0){
      updatedQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = updatedQty;
    }else{
      updatedCartItems.push({productId: new mongoDb.ObjectId(product._id), quantity: updatedQty})
    }
    
    const db = getDb();
    const updatedCart = { items : updatedCartItems};
    return db.collection("users").updateOne(
      { _id: new mongoDb.ObjectId(this._id) },
      { $set: { cart : updatedCart } }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongoDb.ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCart(){
     const db = getDb();
     const productIds = this.cart.items.map((item) => {
        return item.productId;
     });
     return db.collection("products")
        .find({_id: {$in: productIds}})
        .toArray()
        .then((products) => {
            return products.map(p => {
              return {
                ...p,
                quantity: this.cart.items.find(i => {
                   return i.productId.toString() === p._id.toString()
                }).quantity
              };
            })
        }).catch((err) => console.log(err))
  }

  deleteItemFromCart(productId){
      const updatedCartItems = this.cart.items.filter((item) => item.productId.toString() !== productId.toString());
      const db = getDb();
      return db.collection('users').updateOne(
        { _id: new mongoDb.ObjectId(this._id)},
        { $set: { cart : {items : updatedCartItems}} }
      );
  }

  addOrder(){
    const db = getDb();
    return this.getCart().then((products) => {
      const order = {
        items  : products,
        user   : {
          _id  : new mongoDb.ObjectId(this._id),
          name : this.name
        }
      }
      return db.collection('orders').insertOne(order)
    })
    .then(result => {
          this.cart = {items : []};
          return db.collection("users").updateOne(
          { _id: new mongoDb.ObjectId(this._id) },
          { $set: { cart : {items:[]} } }
        );
      })
  }

  getOrders(){
    const db  = getDb();
    return db.collection('orders')
      .find({'user._id' : new mongoDb.ObjectId(this._id)}).toArray();

  }

}

module.exports = User;
