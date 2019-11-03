const Entry = require('./../daos/entrydao');

exports.createEntry = function (req, res, next) {
  const entry = {
    time: req.body.time,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
  };
  Entry.create(entry, (err, entry) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Entry created successfully',
    });
  });
};

exports.getEntries = function (req, res, next) {
  Entry.get({}, (err, entry) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      ...entry,
    });
  });
};
