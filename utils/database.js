const mongodb     = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://danny:daniel001@cluster0.uhjgwui.mongodb.net/?shopretryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connection successful");
      _db = client.db();
      callback(client);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


const getDb = () => {
  if(_db){
    return _db;
  }

  throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb        = getDb;