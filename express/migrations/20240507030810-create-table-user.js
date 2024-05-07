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
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: { type: 'string', notNull: true },
    password: { type: 'string', notNull: true },
    salt: { type: 'string', notNull: true },
    sessionToken: { type: 'string' },
    userName: { type: 'string'},
    createdAt: { type: 'timestamp', notNull: true },
    updatedAt: { type: 'timestamp', notNull: true },
  });
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  version: 1
};