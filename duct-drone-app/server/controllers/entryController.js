const Entry = require('../daos/entrydao');

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
