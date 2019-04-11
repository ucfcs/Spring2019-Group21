let EntryModel = require('./models/entrymodel');
let FloorModel = require('./models/floormodel');
var mongoose = require('mongoose');

const server = '127.0.0.1:27017';      //DB SERVER
const database = 'test';    //DB NAME

//Set up mongoose connection
// var mongoose = require('mongoose');
// var mongoDB = 'insert_your_database_url_here';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:')); 

class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('DB Success');
            })
            .catch(err => {
                console.error('DB ERROR');
            });
    }
}

module.exports = new Database();