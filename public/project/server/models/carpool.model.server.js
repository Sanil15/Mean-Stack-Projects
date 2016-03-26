/**
 * Created by Sanil on 3/23/2016.
 */

var mock= require("./carpool.mock.json");

// load the promise library
var q = require("q");

module.exports = function (){

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
        deferred.resolve(mock);
        return deferred.promise;

    }

    function findCarPoolById(carPoolId){
        var deferred = q.defer();
        console.log(carPoolId);
        var carPool=null;
        for(var i=0;i<mock.length;i++){
            if(mock[i]._id == carPoolId){
                carPool=mock[i];
                break;
            }
        }
        deferred.resolve(carPool);
        return deferred.promise;
    }

    // function to create Carpool for all user
    function createCarPoolByUser(userId, pool){

        var deferred = q.defer();

        pool._id=(new Date).getTime();
        pool.userId=userId;
        mock.push(pool);

        var carpools=mock;
        deferred.resolve(carpools);
        return deferred.promise;
    }


    // functions finds all CarPool's created by user
    function findAllCarPoolByUser(userId){
        var deferred = q.defer();

        var userCarPools=[];
        for(var i=0;i<mock.length;i++){
            if(mock[i].userId == userId){
                userCarPools.push(mock[i]);
            }
        }
        deferred.resolve(userCarPools);
        return deferred.promise;
    }

    // functions finds all CarPool's by source and destination
    function findCarPoolBySourceDestination(source, destination){
        var deferred = q.defer();

        var carPools=[];
        for(var i=0;i<mock.length;i++){
            if(mock[i].source == source && mock[i].destination == destination){
                carPools.push(mock[i]);
            }
        }

        deferred.resolve(carPools);
        return deferred.promise;
    }

    // functions finds all CarPool's by city
    function findCarPoolByCity(city){
        var deferred = q.defer();

        var carPools=[];
        for(var i=0;i<mock.length;i++){
            if((mock[i].source.toLowerCase().indexOf(city.toLowerCase()) > -1) || (mock[i].destination.toLowerCase().indexOf(city.toLowerCase()) > -1)){
                carPools.push(mock[i]);
            }
        }
        deferred.resolve(carPools);
        return deferred.promise;
    }


    // function to delete CarPool by id
    function deleteCarPoolById(carPoolId){
        var deferred = q.defer();

        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == carPoolId)
            {
                mock.splice(i,1);
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    // function updates the CarPool by its id
    function updateCarPoolById(carPoolId,pool){
        var deferred = q.defer();

        var a;
        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == carPoolId){
                mock[i].basePrice=pool.basePrice;
                mock[i].carInfo=pool.carInfo;
                mock[i].comments=pool.comments;
                mock[i].date=pool.date;
                mock[i].destination=pool.destination;
                mock[i].source=pool.source;
                mock[i].time=pool.time;
                mock[i].noOfSeats=pool.noOfSeats;
                break;
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

}


