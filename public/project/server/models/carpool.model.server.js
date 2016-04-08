/**
 * Created by Sanil on 3/23/2016.
 */

var mongoose=require('mongoose');

// load the promise library
var q = require("q");

module.exports = function (db){

    var CarPoolSchema = require("./carpool.schema.server.js")();
    var CarPoolModel = mongoose.model("CarPoolModel",CarPoolSchema)

    var api = {
        createCarPoolByUser: createCarPoolByUser,
        findAllCarPoolByUser: findAllCarPoolByUser,
        deleteCarPoolById: deleteCarPoolById,
        updateCarPoolById: updateCarPoolById,
        findCarPoolBySourceDestination: findCarPoolBySourceDestination,
        findCarPoolByCity: findCarPoolByCity,
        findAllCarPool: findAllCarPool,
        findCarPoolById: findCarPoolById
    };

    return api;

    function findAllCarPool(){
        var deferred = q.defer();
        CarPoolModel
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

    function findCarPoolById(carPoolId){
        var deferred = q.defer();
        CarPoolModel
            .findById(carPoolId,
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

    // function to create Carpool for all user
    function createCarPoolByUser(userId, pool){

        var deferred = q.defer();
        pool.userId=userId;

        CarPoolModel
            .create(pool,
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


    // functions finds all CarPool's created by user
    function findAllCarPoolByUser(userId){
        var deferred = q.defer();
        CarPoolModel
            .find(
                {userId: userId},
                function (err, applications) {
                    if (!err) {
                        deferred.resolve (applications);
                    } else {
                        deferred.reject (err);
                    }
                }
            );
        return deferred.promise;
    }

    // functions finds all CarPool's by source and destination
    function findCarPoolBySourceDestination(source, destination){
        var deferred = q.defer();
        CarPoolModel
            .find(
                {
                    $or:
                        [
                            {'source': { "$regex": source, "$options": "i"}},
                            {'destination': {"$regex": destination, "$options": "i" }}
                        ]
                },
                function (err, applications) {
                    if (!err) {
                        deferred.resolve (applications);
                    } else {
                        deferred.reject (err);
                    }
                }
            );
        return deferred.promise;
    }

    // functions finds all CarPool's by city
    function findCarPoolByCity(city){
        var deferred = q.defer();
        console.log("HI");
        CarPoolModel
            .find(
                {
                    $or:
                        [
                            {'source': { "$regex": city, "$options": "i"}},
                            {'destination': {"$regex": city, "$options": "i" }}
                        ]
                },
                function (err, results) {
                    if (!err) {
                        console.log(results);
                        deferred.resolve (results);
                    } else {
                        deferred.reject (err);
                    }
                }
            );
        return deferred.promise;
    }


    // function to delete CarPool by id
    function deleteCarPoolById(carPoolId){
        return CarPoolModel.remove().where("_id").equals(carPoolId);
    }

    // function updates the CarPool by its id
    function updateCarPoolById(carPoolId,pool){

        var deferred = q.defer();
        CarPoolModel
            .update(
                {_id: carPoolId},
                {$set: {
                    "basePrice":pool.basePrice,
                    "carInfo":pool.carInfo,
                    "comments":pool.comments,
                    "date":pool.date,
                    "destination":pool.destination,
                    "source":pool.source,
                    "time":pool.time,
                    "noOfSeats":pool.noOfSeats
                }},
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


