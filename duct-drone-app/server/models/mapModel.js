const mongoose = require('mongoose');
const entrySchema = require('./entrymodel');

const { Schema } = mongoose;

const mapSchema = new Schema({
  name: String,
  map_link: String,
  date: Date,
  sensorData: [entrySchema],
});

module.exports = mapSchema;
