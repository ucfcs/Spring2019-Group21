var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const floorSchema = new Schema({
    name: String,
    map_link: String,
    date: Date,
    sensorData: [{ type: Schema.Types.ObjectId, ref: 'Entry' }]
});

module.exports = mongoose.model('Floor', floorSchema);