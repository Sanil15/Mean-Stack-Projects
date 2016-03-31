/**
 * Created by Sanil on 3/16/2016.
 */
// load the mongoose library
var mongoose = require("mongoose");
// load the promise library
var q = require("q");

module.exports = function(db){

    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User",UserSchema);


    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findAllUsers : findAllUsers,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser
    }

    return api;


    function findUserByCredentials(credentials){
        var deferred = q.defer();
        User
            .findOne({
                username: credentials.username,
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

    function findUserByUsername(username){
        var deferred = q.defer();

        User
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


    // function returns all set of users
    function findAllUsers(){
        var deferred = q.defer();
        User.find(
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

        User.create(user, function (err, stats){
            if(!err) {
                deferred.resolve(stats);
            }
            else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    // function to find the id
    function findUserById(id){
        var deferred = q.defer();
        User
            .findById(id,
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

    // function deletes a user by userId
    function deleteUserById(userId){
        var deferred = q.defer();
        User
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


    // function to update a user and its various attributes
    function updateUser(userId, user){
        var deferred = q.defer();
        User
            .update(
                {_id: userId},
                {$set: user},
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
}