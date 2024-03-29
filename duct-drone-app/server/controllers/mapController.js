const Map = require('./../daos/mapdao');

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
      id: map.id,
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

exports.addSensorData = function(req, res, next) {
  Map.findOne({_id: req.params.id}).then(function(map,err) {
    const entry = {
      time: req.body.time,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      };
      
      map.sensorData.push(entry);
      map.save();
      if(err) {
        return res.json({
          error: err,
        });
      }
      res.json({
        message: `Successfully updated ${req.params.id}`
      });
    }
  );
}

exports.addMapLink = function(req, res, next) {
  Map.findOne({_id: req.params.id}).then(function(map,err) {
    map.map_link = req.body.map_link;
      console.log(req.body.map_link);
      map.save();
      if(err) {
        return res.json({
          error: err,
        });
      }
      res.json({
        message: `Successfully updated ${req.params.id}'s map link to ${req.body.map_link}`
      });
    }
  );
}