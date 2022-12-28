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
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
