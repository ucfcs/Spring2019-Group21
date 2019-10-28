const mongoose = require('mongoose');
const entrySchema = require('./entryModel');

const { Schema } = mongoose;

const mapSchema = new Schema({
  name: String,
  map_link: String,
  date: {
    type:  Date,
    default: Date.now
  },

  sensorData: [entrySchema],
});

module.exports = mapSchema;
