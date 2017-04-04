var express = require('express');
var router = express.Router();

var Cube = require('../models/cube');
var CubeUtils = require('../lib/cube');
var CubeController = require('../controllers/cube');

/*
 * 'post /cube/:id/update/' : 'CubeController.updateValue',
 * 'get /cube/:id/query/' : 'CubeController.queryValue'
 */

/* GET cubes listing. */
router.get('/status', function(req, res, next) {
  res.json({ status: 'ok' });
});

router.get('/:id', CubeController.findById);

router.get('/', CubeController.findAll);

router.post('/', CubeController.create);

router.post('/:id/update', CubeController.updateValue);

router.post('/:id/query', CubeController.queryValue);


module.exports = router;