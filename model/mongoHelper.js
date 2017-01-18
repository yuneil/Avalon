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
exports.find = find;
exports.findOne = findOne;
exports.update = update;
exports.insert = insert;
exports.remove = remove;
exports.toJson = toJson;

function find(collection, selector, callback) {
    try {
        db.collection(collection).find(selector).toArray(function(err, docs) {
            console.dir(docs);
            callback(docs);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function findOne(collection, selector, callback) {
    try {
        db.collection(collection).findOne(selector, function(err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function update(collection, selector, document, callback, isUpsert = false, isMulti = false) {
    try {
        db.collection(collection).update(selector, document, { upsert: isUpsert, multi: isMulti }, function(err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function update(collection, selector, document, callback) {
    try {
        db.collection(collection).update(selector, document, { upsert: isUpsert, multi: isMulti }, function(err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function remove(sql, callback) { queryWithoutResult(sql, params, callback); }

function toJson(rows) {

}