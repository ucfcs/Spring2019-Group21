const Map = require('../daos/mapdao');

exports.createMap = function (req, res, next) {
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

exports.createMaps = function (req, res, next) {
  const array = [];
  req.body.forEach((map) => {
    array.push(
      {
        name: map.name,
        map_link: map.map_link,
        date: map.date,
        sensorData: map.sensorData,
      }
    );
  });
  Map.insertMany(array, (err, map) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({
      message: 'Maps created successfully',
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
  Map.delete({ _id: req.params.id }, (err, map) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({
      message: 'Map deleted successfully',
    });
  });
};
exports.removeMaps = function (req, res, next) {
  Map.deleteMany({}, (err, map) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({
      message: 'Deleted all maps successfully',
    });
  });
};
