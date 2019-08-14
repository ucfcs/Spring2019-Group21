const mongoose = require('mongoose');

const { Schema } = mongoose;

const mapSchema = new Schema({
  name: String,
  map_link: String,
  date: Date,
  sensorData: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
});

module.exports = mapSchema;
