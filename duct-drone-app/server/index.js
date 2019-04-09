let Entry = require('./models/entrymodel');
let Floor= require('./models/floormodel');
var express = require('express');
const path = require('path');
var app = express();
const server = '127.0.0.1:27017';      //DB SERVER
const database = 'test';    //DB NAME


 //respond with "hello world" when a GET request is made to the homepage
app.use(express.static(path.join(__dirname, '../build')));

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

var mongoose = require('mongoose');
var mongoDB = `mongodb://${server}/${database}`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var testdata = new Entry({
	coordinate:[{ x:32, y:32, z:23}],
	time: new Date(),
	temperature: 32.3,
	air_velocity: 35.2,
});

app.get("/adddata", (req, res) => {
	var testdata = new Entry({
	coordinate:[{ x:32, y:32, z:23}],
	time: new Date(),
	temperature: 32.3,
	air_velocity: 35.2,
	});
	testdata.save()
		.then(item => {
			res.send("Saved to db");
		})
		.catch(err => {
			res.status(400).send("unable to save to db");
		});
});
