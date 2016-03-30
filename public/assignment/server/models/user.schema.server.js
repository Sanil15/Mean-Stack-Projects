/**
 * Created by Sanil on 3/30/2016.
 */
var mongoose = require("mongoose");

module.exports = function () {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]
    },{collection : 'user'});
    return UserSchema;
};
