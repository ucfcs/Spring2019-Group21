const Map = require('../controllers/mapController');

module.exports = function (router) {
  router.get('/get/maps', Map.getMaps);
  router.post('/create/map', Map.createMap);
  router.post('/create/maps', Map.createMaps);
  router.put('/update/map/:id/SensorData', Map.addSensorData);
  router.put('/update/map/:id/maplink', Map.addMapLink);
  router.delete('/remove/:id', Map.removeMap);
  router.delete('/removeall', Map.removeMaps);
};
