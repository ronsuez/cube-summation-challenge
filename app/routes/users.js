var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/status', function(req, res, next) {
  res.json({ status: 'user API ok' });
});

module.exports = router;