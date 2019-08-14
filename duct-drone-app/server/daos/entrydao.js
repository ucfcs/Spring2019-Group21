const mongoose = require('mongoose');

const entrySchema = require('../models/entryModel');

entrySchema.statics = {
  create(data, cb) {
    const entry = new this(data);
    entry.save(cb);
  },
  get(query, cb) {
    this.find(query, cb);
  },
};

const entryModel = mongoose.model('Entry', entrySchema);
module.exports = entryModel;
