var mysqlHelper = require('../model/mysqlHelper');
// var mongoHelper = require('../model/mongoHelper');
var common = require('../model/common.js');
var preres = common.preres;

exports.login = (req, res) => {
    var code = req.body.code;
    var password = req.body.password;

    mysqlHelper.query('select name, password, salt from user where code = ?', [code], function(rows, err) {
        if (rows[0][1] == password) {
            res.send(preres(true));
        } else {
            res.send(preres(false));
        }
    });
}

exports.loginWithExtension = (req, res) => {}

exports.signup = (req, res) => {
    var code = req.body.code;
    var password = req.body.password;

    mysqlHelper.queryOne('select code where code = ?', [code], function(doc, err) {
        if (doc && doc.code) {
            res.send(preres(false, 10, '用户名密码错误'));
        } else {
            var now = Date.now();
            mysqlHelper.queryWithoutResult('insert into user(code, password, initTime, salt) values(?, ?, ?, ?)', [code, password, now, ],
                function(rows, err) {

                });
        }
    })


}

exports.signup_sendVerification_mail = (req, res) => {}

exports.forgetPassward = (req, res) => {}

exports.logout = (req, res) => {}