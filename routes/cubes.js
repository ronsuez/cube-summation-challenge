var express = require('express');
var router = express.Router();

var Cube = require('../app/models/cube');
var CubeUtils = require('../app/lib/cube');
/*
 * 'post /cube/:id/update/' : 'CubeController.updateValue',
 * 'get /cube/:id/query/' : 'CubeController.queryValue'
 */

/* GET cubes listing. */
router.get('/', function(req, res, next) {
  Cube.find({}, function(err, cubes) {
    if (err) return res.json({err});
    // saved!
    res.json({
      query: 'respond with a resource, cube get',
      data: cubes
    });
  })
});

router.post('/', function(req, res, next) {
  Cube.create({
    dimension: '4'
  }, function(err, cube) {
    if (err) return res.json({err});
    // saved!
    res.json({
      query: 'respond with a resource, cube update',
      data: cube
    });
  })
});


router.get('/:id', function(req, res, next) {
  Cube.findById(req.params.id, function(err, cube) {
    if (err) return res.json({err});
    // saved!
    console.log(err, cube);
    res.json({
      query: 'respond with a resource, cube get',
      data: cube
    });
  })
});

router.post('/:id/update', function(req, res, next) {

});

router.post('/:id/query', function(req, res, next) {

});


module.exports = router;
