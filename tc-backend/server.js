const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
var cors = require('cors');
const schema = require('./schema/schema');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asvifi85:Vinay@143@cluster0.ks2gb.mongodb.net/tc-books?retryWrites=true&w=majority";
/*const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("tc-books").collection("books");
  // perform actions on the collection object
	 client.db("tc-books").collection("books").find().toArray(function (err, result) {
    if (err) throw err
 })
  // client.close();
});
*/
 const mongodburl = uri

  mongoose.connect(mongodburl, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex:true,
   }).then(() => console.log('Hurry Database Connected'));

app.use('/graphql',cors(),graphqlHTTP({
	schema,
	graphiql:true,
	
}));
app.listen(4000,() => {
	console.log('now listening to 4000');
});