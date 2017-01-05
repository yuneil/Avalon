var mysqlHelper = require('../model/mysqlHelper');
var mongoHelper = require('../model/mongoHelper');

exports.login = (req, res) => {
    // mysqlHelper.query('select name from user where id = ?', [1], function(rows, err) {
    //     res.send(rows);
    // })

    mongoHelper.query({}, 'test', function(rows, err) {
        res.send(rows);
    })
}

exports.loginWithExtension = (req, res) => {}

exports.signup = (req, res) => {}

exports.signup_sendVerification_mail = (req, res) => {}



exports.forgetPassward = (req, res) => {}

exports.logout = (req, res) => {}