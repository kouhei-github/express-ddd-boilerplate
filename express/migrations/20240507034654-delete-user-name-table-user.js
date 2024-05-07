'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.removeColumn('users', 'userName');
};

exports.down = function(db) {
  return db.addColumn('users', 'userName', { type: 'string'});
};

exports._meta = {
  version: 1
};