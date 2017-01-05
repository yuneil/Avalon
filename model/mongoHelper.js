var mongo = require('mongodb');
var config = require('../config')

var client = mongo.MongoClient;
var db;

// client.connect("mongodb://" + config.mongo.user + ":" + config.mongo.password + "@" + config.mongo.host + "/" + config.mongo.database, {},
client.connect("mongodb://" + config.mongo.host + "/" + config.mongo.database, {},
    function(err, database) {
        if (err) throw err;
        db = database;
    });

exports.db = db;
exports.query = query;
exports.queryOne = queryOne;
exports.update = update;
exports.insert = insert;
exports.remove = remove;
exports.toJson = toJson;

function query(sql, collection, callback) {
    // try {
    //     db.collection(collection).find(sql, function(err, docs) {
    //         callback(docs, err);
    //     });
    // } catch (error) {
    //     callback([], error);
    //     console.log(error);
    // }

    db.collection(collection).find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        assert.equal(2, docs.length);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
}

function queryOne(sql, params, callback) {
    try {
        db.collection(collection).findOne(sql, function(err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function queryWithoutResult(sql, params, callback) {
    try {
        db.collection(collection).update(sql, function(err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function update(sql, callback) { queryWithoutResult(sql, params, callback); }

function insert(sql, callback) { queryWithoutResult(sql, params, callback); }

function remove(sql, callback) { queryWithoutResult(sql, params, callback); }

function toJson(rows) {

}