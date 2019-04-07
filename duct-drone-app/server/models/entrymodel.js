import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    _id: Schema.Types.ObjectId,
    coordinate: [{ x: Number, y: Number, z: Number }],
    time: Date,
    temperature: Double,
    air_velocity: Double
});

module.exports = mongoose.model('Entry', entrySchema);
