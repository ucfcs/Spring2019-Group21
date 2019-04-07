var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    _id: Schema.Types.ObjectId,
    coordinate: [{ x: Number, y: Number, z: Number }],
    time: Date,
    temperature: Schema.Types.Decimal128,
    air_velocity: Schema.Types.Decimal128
});

module.exports = mongoose.model('Entry', entrySchema);
