const Map = require('../controllers/mapController');

module.exports = function (router) {
  router.get('/get/maps', Map.getMaps);
  router.post('/create/map', Map.createMap);
};
