const mongoose = require('mongoose');

const { Schema } = mongoose;
const entrySchema = new Schema({
  coordinates: { x: Number, y: Number, z: Number },
  date: {
    type:  Date,
    default: Date.now
  },
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
});

module.exports = entrySchema;
