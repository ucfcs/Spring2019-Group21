const Entry = require('./../daos/entrydao');

exports.createEntry = function (req, res, next) {
  const entry = {
    time: req.body.time,
    temperature: req.body.temperature,
    air_velocity: req.body.air_velocity,
    coordinates:
      {
        x: req.body.coordinates.x,
        y: req.body.coordinates.y,
        z: req.body.coordinates.z,
      },
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
