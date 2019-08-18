const mongoose = require('mongoose');

const mapSchema = require('../models/mapModel');

mapSchema.statics = {
  create(data, cb) {
    const map = new this(data);
    map.save(cb);
  },
  get(query, cb) {
    this.find(query, cb);
  },
  delete(query, cb) {
    this.findOneAndDelette(query, cb);
  },
};

const mapModel = mongoose.model('Map', mapSchema);
module.exports = mapModel;
