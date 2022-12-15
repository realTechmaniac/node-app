const mongodb     = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://danny:daniel001@cluster0.uhjgwui.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connection successful");
      callback(client);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = mongoConnect;