/**
 * Created by Sanil on 3/23/2016.
 */
// load the mongoose
var mongoose= require("mongoose");

// load the promise library
var q = require("q");

module.exports = function (){

    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel",UserSchema);

    var api = {
        findUserByCredentials : findUserByCredentials,
        findAllUsers : findAllUsers,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        uploadImageById: uploadImageById,
        updateUserByAdmin:updateUserByAdmin
    };

    return api;

    function uploadImageById(userId, imgUrl){
        var deferred = q.defer();
        UserModel
            .update(
                {_id: userId},
                {$set: {
                    "image": imgUrl
                }},
                function (err, results){
                    if(!err) {
                        deferred.resolve(results);
                    }
                    else{
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }


    function findUserById(userId){
        var deferred = q.defer();
        UserModel
            .findById(userId,
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }


    // function to find Email and Password
    function findUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel
            .findOne({
                    $or:[{'username': credentials.username},{'emails': credentials.username}],
                    password: credentials.password
                },
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    // function returns all set of users
    function findAllUsers(){
        var deferred = q.defer();
        UserModel
            .find(
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    // function creates a set of users
    function createUser(user){

        var deferred = q.defer();
        UserModel
            .create(user, function (err, stats){
                if(!err) {
                    deferred.resolve(stats);
                }
                else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    // function deletes a user by userId
    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel
            .remove(
                {_id: userId},
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel
            .findOne(
                {username: username},
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function updateUserByAdmin(userId, user){
        var deferred = q.defer();
        UserModel
            .update(
                {_id: userId},
                {$set: {
                    "roles": user.roles
                }},
                function (err, results){
                    if(!err) {
                        deferred.resolve(results);
                    }
                    else{
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    // function to update a user and its various attributes
    function updateUser(userId, user){
        var deferred = q.defer();
        UserModel
            .update(
                {_id: userId},
                {$set: {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "address": user.address,
                    "country": user.country,
                    "city": user.city,
                    "contact": user.contact,
                    "dob": user.dob,
                    "zipCode": user.zipCode,
                    "state": user.state
                }},
                function (err, results){
                    if(!err) {
                        deferred.resolve(results);
                    }
                    else{
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
}