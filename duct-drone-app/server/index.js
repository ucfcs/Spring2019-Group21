const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const entryRoute = require('./routes/entry');
const mapRoute = require('./routes/map');

const app = express();
const server = '127.0.0.1:27017'; // DB SERVER
const database = 'test'; // DB NAME
const port = process.env.PORT || 5000;


const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

const mongoDB = `mongodb://${server}/${database}`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const router = express.Router();
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization');
//   next();
// });
app.use('/api', router);
entryRoute(router);
mapRoute(router);
app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
