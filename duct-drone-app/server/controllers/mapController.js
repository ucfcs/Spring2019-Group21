const map = require('../daos/mapdao');

exports.getMaps = function (req, res, next) {
  map.get({}, (err, map) => {
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
