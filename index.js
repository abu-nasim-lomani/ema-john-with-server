const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');



const app = express();
app.use(bodyParser.json());
app.use(cors());



require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qijdl.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(process.env.DB_USER)
app.get('/', (req, res) => {
    res.send('Welcome')
})



client.connect(err => {
  const collection = client.db(`${process.env.DB_DBNAME}`).collection(`${process.env.DB_COLLECTION_NAME}`);
  app.post('/addProduct', (req, res) => {
      const product=req.body;
      collection.insertOne(product)
      .then(result => {
          console.log(result)
      })
  })
  client.close();
});

app.listen(4000);