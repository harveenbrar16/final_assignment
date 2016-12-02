/**
 * Created by NABDEEP MANAK on 2016-12-01.
 */
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({

});

accountSchema.plugin(plm);

// make this public
module.exports = mongoose.model('Account', accountSchema);
