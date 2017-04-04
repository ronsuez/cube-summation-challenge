var Cube = require('../models/cube');
var CubeUtils = require('../lib/cube');

module.exports = {
  findAll: findAll,
  findById: findById,
  create: create,
  updateValue: updateValue,
  queryValue: queryValue
}

function findAll(req, res) {
  console.log('hola');
  Cube.find({}, function(err, cubes) {
    if (err) return res.json({ err });
    // saved!
    res.json({
      query: 'respond with a resource, cube get',
      data: cubes
    });
  })
}


function findById(req, res) {
  Cube.findById(req.params.id, function(err, cubes) {
    if (err) return res.json({ err });
    // saved!
    res.json({
      query: 'respond with a resource, cube get',
      data: cubes
    });
  })
}


function create(req, res) {
  Cube.create({
    dimension: req.body.dimension || 4,
    state: CubeUtils.initialize(req.body.dimension || 4)
  }, function(err, cube) {
    if (err) return res.json({ err });
    // saved!
    res.json({
      query: 'respond with a resource, cube create',
      data: cube
    });
  })
}


function updateValue(req, res) {

  console.log(req.body);
  Cube.findById(req.params.id).then((resp) => {

    console.log('cube:', resp._id);

    if (!resp) return res.json({ status: 'find-not-ok', err: 'Could not find cube', _id: req.params.id });

    CubeUtils.updateValue(resp, req.body.position, req.body.value[0], function(err, results) {

      if (err) return res.json({ status: 'update-not-ok', err: err, _id: req.params.id });

      return res.json({
        err: null,
        'query': 'respond with a resource, cube updateValue',
        data: Object.assign(results, {
          _id: req.params.id,
          position: req.body.position.join(','),
          value: req.body.value
        })
      })
    });
  }).catch((err) => res.json({ status: 'find-not-ok', err: err.toString(), _id: req.params.id }));
}


function queryValue(req, res) {

  Cube.findById(req.params.id).then((resp) => {

    console.log(resp);

    if (!resp) return { status: 'find-not-ok', err: 'Could not find cube', _id: req.params.id };

    var origin = req.body.position.slice(0, 3);
    var destination = req.body.position.slice(3, 6);
    CubeUtils.queryValue(resp,
      origin, destination,
      function(err, results) {

        if (err) return res.json({ status: 'update-not-ok', err: err.toString(), _id: req.params.id });

        return res.json({
          err: null,
          'query': 'respond with a resource, cube updateValue',
          data: Object.assign(results, {
            _id: req.params.id,
            position: [origin, destination].join(','),
            value: results.total,
            state: results.state
          })
        })
      });
  }).catch((err) => res.json({ status: 'find-not-ok', err: err.toString(), _id: req.params.id }));
}