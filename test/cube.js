var should = require('should');
var async = require('async');
var _ = require('lodash');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cube_sumation');
mongoose.Promise = require('bluebird');

var Cube = require('../app/models/cube');
var History = require('../app/models/history');

var CubeUtils = require('../app/lib/cube');

describe('testing-suite: Cube Test Case validations', function() {

  var cube = {};

  before(function(done) {
    Cube.create({
      dimension: 4,
      state: CubeUtils.initialize(4)
    }, function(err, instance) {
      cube = instance;
      done();
    })
  })

  it('should fail to create a cube with dimension 0', function(done) {

    Cube.create({
      dimension: 0
    }, function(err, cube) {
      // saved!
      should.not.exist(cube);
      should.exist(err);
      done();
    })

  });

  it('should fail to create a cube with dimension 101', function(done) {
    Cube.create({
      dimension: 101
    }, function(err, cube) {
      // saved!
      should.not.exist(cube);
      should.exist(err);
      done();
    });
  });

  it('should  create a cube with dimension 4', function(done) {
    Cube.create({
      dimension: 4
    }, function(err, cube) {
      // saved!
      should.not.exist(err);
      should.exist(cube);
      should(cube.dimension)
        .be.equal(4);
      done();
    })
  });

  it('should fail to update a cube with a bad coordinate [2, 5, 2]', function(done) {
    CubeUtils.updateValue(cube, [2, 5, 2], 4, function(err, results) {
      should.not.exist(results);
      should.exist(err);
      done();
    });
  });

  it('should fail to update a cube with a bad value 10^9 + 1', function(done) {
    CubeUtils.updateValue(cube, [2, 2, 2], (Math.pow(10, 9) + 1), function(err, results) {
      should.not.exist(results);
      should.exist(err);
      done();
    });
  });

  it('should fail to update a cube with a bad value 10^9 - 1', function(done) {
    CubeUtils.updateValue(cube, [2, 2, 2], (Math.pow(-10, 9) - 1), function(err, results) {
      should.not.exist(results);
      should.exist(err);
      done();
    });
  });
});


describe('Cube Test Case #1', function() {
  var cube = {};

  before(function(done) {
    Cube.create({
      dimension: 4,
      state: CubeUtils.initialize(4)
    }, function(err, instance) {
      cube = instance;
      done();
    })
  })

  it('update a cube by a given coords, value -  (id, x, y, z, value) = ( 2, 2, 2, 4)', function(done) {
    CubeUtils.updateValue(cube, [2, 2, 2], 4, function(err, result) {
      should.not.exist(err);
      result.value.should.equal(4);
      done();
    });
  });

  it('query a cube by a given  coords -  (id, x1, y1, z1, y1, y2, z2) = (1, 1 , 1 , 3, 3, 3) = 4', function(done) {
    CubeUtils.queryValue(cube, [1, 1, 1], [3, 3, 3], function(err, result) {
      should.not.exist(err);
      result.total.should.equal(4);
      done();
    });
  });

  it('update a cube by a given  coords, value -  (id, x, y, z, value) = ( 1, 1, 1, 23) ', function(done) {
    CubeUtils.updateValue(cube, [1, 1, 1], 23, function(err, result) {
      should.not.exist(err);
      result.value.should.equal(23);
      done();
    });
  });

  it('query a cube by a given coords -  (id, x1, y1, z1, y1, y2, z2) = (2, 2 , 2 , 4, 4, 4) = 4', function(done) {
    CubeUtils.queryValue(cube, [2, 2, 2], [4, 4, 4], function(err, result) {
      should.not.exist(err);
      result.total.should.equal(4);
      done();
    });
  });

  it('query a cube by a given coords -  (id, x1, y1, z1, y1, y2, z2) = (1, 1 , 1 , 3, 3, 3) = 27', function(done) {
    CubeUtils.queryValue(cube, [1, 1, 1], [3, 3, 3], function(err, result) {
      should.not.exist(err);
      result.total.should.equal(27);
      done();
    });
  });
});


describe('Cube Test Case #2', function() {
  var cube = {};

  before(function(done) {
    Cube.create({
      dimension: 4,
      state: CubeUtils.initialize(4)
    }, function(err, instance) {
      cube = instance;
      done();
    })
  })

  it('update a cube by a given coords, value -  (id, x, y, z, value) = (2, 2, 2, 1)', function(done) {
    CubeUtils.updateValue(cube, [2, 2, 2], 1, function(err, result) {
      should.not.exist(err);
      result.value.should.equal(1);
      done();
    });
  });

  it('query a cube by a given coords -  (id, x1, y1, z1, y1, y2, z2) = (1, 1, 1 , 1, 1, 1) = 0', function(done) {
    CubeUtils.queryValue(cube, [1, 1, 1], [1, 1, 1], function(err, result) {
      should.not.exist(err);
      result.total.should.equal(0);
      done();
    });
  });

  it('query a cube by a given coords -  (id, x1, y1, z1, y1, y2, z2) = (1, 1, 1 , 2, 2, 2) = 1', function(done) {
    CubeUtils.queryValue(cube, [1, 1, 1], [2, 2, 2], function(err, result) {
      should.not.exist(err);
      result.total.should.equal(1);
      done();
    });
  });

  it('query a cube by a given id, coords -  (id, x1, y1, z1, y1, y2, z2) = (2, 2 , 2 , 2, 2, 2) = 1', function(done) {
    CubeUtils.queryValue(cube, [2, 2, 2], [2, 2, 2], function(err, result) {
      should.not.exist(err);
      result.total.should.equal(1);
      done();
    });
  });

  after(function(done) {
    async.parallel([
      (done) => {
        Cube.remove({}, done)
      },
      (done) => {
        History.remove({}, done)
      }
    ], function(err, data) {
      if (err) console.log(err);
      done();
    })
  })
});