var Cube = require('../models/cube');
var History = require('../models/history');

var _ = require('lodash');

var CubeUtils = {
  initialize: initialize,
  checkCoordinates: checkCoordinates,
  queryValue: queryValue,
  updateValue: updateValue,
  parseInput: parseInput
}


function parseInput(payload) {
  return payload;
}


/**
 * Creates a multilayer array by a given dimension
 * @method initialize
 * @param  Number   dimension
 * @return Array             Cube filled
 */
function initialize(dimension) {

  var cube = [];
  for (var x = 0; x < dimension; x++) {
    var array = [];
    for (var y = 0; y < dimension; y++) {
      var internal = [];
      for (var z = 0; z < dimension; z++) {
        internal.push(0);
      }
      array.push(internal);
    }
    cube.push(array);
  }
  return cube;
};



/**
 * checkCoordinates
 * @method function
 * @param  {[type]}   id          [description]
 * @param  {[x, y, z]}   coordinates [description]
 * @param  {Function} done        [description]
 * @return {[type]}               [description]
 */

function checkCoordinates(dimension, coordinates) {

  if (coordinates.length < 3) return false;

  //check coordinates
  var check = coordinates.filter(function(coordinate) {
    return (coordinate) >= dimension || coordinate < 0;
  });

  return check.length ? false : true;
}


/**
 * [updateValue description]
 * @method updateValue
 * @param  {[type]}    cube        [description]
 * @param  {[type]}    coordinates [description]
 * @param  {[type]}    value       [description]
 * @param  {Function}  cb          [description]
 * @return {[type]}                [description]
 */
function updateValue(cube, coordinates, value, cb) {

  if (!cube || typeof cube != 'object') {
    return cb({
      err: 'invalid cube',
    });
  }

  if (value < Math.pow(-10, 9) || value > Math.pow(10, 9)) {
    return cb({
      err: 'invalid value',
    });
  }

  var formattedCoordinates = coordinates.map(function(i) {
    return parseInt(i) - 1;
  })

  if (!checkCoordinates(cube.dimension, formattedCoordinates)) {
    return cb({
      err: 'invalid coordinates',
      entry: coordinates,
      output: formattedCoordinates
    });
  }

  var matrix = cube.state;
  var x = formattedCoordinates[0],
    y = formattedCoordinates[1],
    z = formattedCoordinates[2];

  console.log(x, y, z);

  matrix[x][y][z] = parseInt(value);

  // cube.state = matrix;

  // cube.save();

  Cube.update({ _id: cube._id }, { $set: { state: matrix } }, function(err, cubeUpdated) {

    console.log(err, cubeUpdated);

    return cb(err, { value: parseInt(value), state: cube });
  });


  // promise.then(function(doc) {
  //   History.create({
  //     cube: cube._id,
  //     coordinates: formattedCoordinates,
  //     value: value
  //   });
  //   return cb(null, {
  //     value: value
  //   });
  // });
};

/**
 * [function description]
 * @method function
 * @param  {[type]}   id          [description]
 * @param  {[x1, y1, z1]}   origin      [description]
 * @param  {[x2, y2, z2]}   destination [description]
 * @param  {Function} cb          [description]
 * @return {[type]}               [description]
 */
function queryValue(cube, origin, destination, cb) {

  console.log(origin, destination);


  if (!cube || typeof cube != 'object') {
    return cb({
      err: 'invalid cube',
    });
  }

  var formattedOrigin = origin.map(function(i) {
    return parseInt(i) - 1;
  });

  var formattedDestination = destination.map(function(i) {
    return parseInt(i) - 1;
  });

  if (!checkCoordinates(cube.dimension, formattedOrigin) ||
    !checkCoordinates(cube.dimension, formattedDestination)) {
    return cb({
      err: 'invalid coodinates',
      origin: formattedOrigin,
      destination: formattedDestination
    });
  }

  console.log(formattedOrigin, formattedDestination);

  var matrix = cube.state;

  var sum = 0;
  for (var i = formattedOrigin[0]; i <= formattedDestination[0]; i++) {
    for (var j = formattedOrigin[1]; j <= formattedDestination[1]; j++) {
      for (var k = formattedOrigin[2]; k <= formattedDestination[2]; k++) {
        sum += matrix[i][j][k];
      }
    }
  }
  return cb(null, {
    total: sum,
    state: matrix
  });
};

module.exports = CubeUtils;