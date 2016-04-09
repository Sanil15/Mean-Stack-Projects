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
        email: String,
        roles: [String],
        dob: Date,
        country: String,
        state: String,
        city: String,
        address: String,
        zipCode: Number,
        contact: [String],
    },{collection : 'user'});
    return UserSchema;
};