const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const entryRoute = require('./routes/entry');
const mapRoute = require('./routes/map');

const app = express();
const server = '127.0.0.1:27017'; // DB SERVER
const database = 'test'; // DB NAME
const port = process.env.PORT || 5000;

// respond with "hello world" when a GET request is made to the homepage
app.use(express.static(path.join(__dirname, '../build')));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const mongoDB = `mongodb://${server}/${database}`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const router = express.Router();
app.use('/api', router);
entryRoute(router);
mapRoute(router);
app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
