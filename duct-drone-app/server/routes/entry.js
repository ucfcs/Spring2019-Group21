const Entry = require('../controllers/entryController');

module.exports = function (router) {
  router.get('/get/entries', Entry.getEntries);
  router.post('/create/entry', Entry.createEntry);
};
