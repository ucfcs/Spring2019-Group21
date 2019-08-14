const mongoose = require('mongoose');

const { Schema } = mongoose;
const entrySchema = new Schema({
  coordinates: { x: Number, y: Number, z: Number },
  time: Date,
  temperature: Schema.Types.Decimal128,
  air_velocity: Schema.Types.Decimal128,
});

module.exports = entrySchema;
