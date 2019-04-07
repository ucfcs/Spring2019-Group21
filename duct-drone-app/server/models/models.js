import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const entrySchema = new Schema({
    _id: Schema.Types.ObjectId,
    coordinate: [{ x: Number, y: Number, z: Number }],
    time: Date,
    temperature: Double,
    air_velocity: Double

});
const floorSchema = new Schema({
    name: String,
    map_link: String,
    date: Date,
    sensorData: [{ type: Schema.Types.ObjectId, ref: 'Entry' }]
});
module.exports = mongoose.model('Entry', entrySchema);
module.exports = mongoose.model('Floor', mapSchema);