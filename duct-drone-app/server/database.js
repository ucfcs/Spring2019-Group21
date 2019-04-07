let EntryModel = require('./models/Entry');
let FloorModel = require('./models/Floor');
let mongoose = require('mongoose');

const server = '127.0.0.1:27017';      //DB SERVER
const database = 'test';    //DB NAME

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