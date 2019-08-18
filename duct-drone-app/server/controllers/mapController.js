const Map = require('../daos/mapdao');

exports.createMap = function (req, res, next) {
  console.log(req.body);
  const map = {
    name: req.body.name,
    map_link: req.body.map_link,
    date: req.body.date,
    sensorData: req.body.sensorData,
  };
  Map.create(map, (err, map) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Map created successfully',
    });
  });
};

exports.getMaps = function (req, res, next) {
  Map.get({}, (err, map) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      ...map,
    });
  });
};

exports.removeMap = function (req, res, next) {
  Map.deleteMany({ _id: req.params.id }, (err, hero) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Map deleted successfully',
    });
  });
};
