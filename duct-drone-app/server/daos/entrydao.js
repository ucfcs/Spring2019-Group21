const mongoose = require('mongoose');

const entrySchema = require('../models/entryModel');

entrySchema.statics = {
  create(data, cb) {
    const entry = new this(data);
    entry.save(cb);
    console.log('cheese');
  },
  get(query, cb) {
    this.find(query, cb);
    console.log('its');
  },
};

const entryModel = mongoose.model('Entry', entrySchema);
module.exports = entryModel;
