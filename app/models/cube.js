/**
 * Cube.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var CubeSchema = new Schema({
  dimension: {
    type: Number,
    min: [4, 'min dimension is 4'],
    max: [100, 'max dimension is 100'],
    required: [true, 'a valid dimension is needed']
  },
  state: {
    type: Array,
  }
});


CubeSchema.plugin(timestamps);

module.exports = mongoose.model('Cube', CubeSchema);
