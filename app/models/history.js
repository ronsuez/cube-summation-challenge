/**
 * Cube.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var HistorySchema = new Schema({
  cube: {
    type: ObjectId,
  },
  coordinates: {
    type: Array,
  },
  value: {
    type: Number
  }
});


HistorySchema.post('save', function(error, doc, next) {
  if (err) next(err);
  console.log(doc);
  next();
});


module.exports = mongoose.model('History', HistorySchema);
