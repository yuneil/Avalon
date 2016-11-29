var mysql = require('mysql');
var config = require('../config')

var pool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

exports.pool = pool;
exports.query = query;
exports.queryOne = queryOne;
exports.update = update;
exports.insert = insert;
exports.remove = remove;
exports.toJson = toJson;

function query(sql, params, callback) {
    try {
        pool.getConnection(function(err, con) {
            con.query(sql, params, function(err, rows) {
                callback(rows, err);
                con.release();
            });
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function queryOne(sql, params, callback) {
    try {
        pool.getConnection(function(err, con) {
            con.query(sql, params, function(err, rows) {
                callback(rows[0], err);
                con.release();
            });
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function queryWithoutResult(sql, params, callback) {
    try {
        pool.getConnection(function(err, con) {
            con.query(sql, params, function(err, rows) {
                callback(rows, err);
                con.release();
            });
        });
    } catch (error) {
        callback(null, error);
        console.log(error);
    }
}

function update(sql, callback) { queryWithoutResult(sql, params, callback); }

function insert(sql, callback) { queryWithoutResult(sql, params, callback); }

function remove(sql, callback) { queryWithoutResult(sql, params, callback); }

function toJson(rows) {

}

pool.on('enqueue', function() {
    console.log('Waiting for available connection slot');
});