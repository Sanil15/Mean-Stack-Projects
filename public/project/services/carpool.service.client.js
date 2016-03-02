/**
 * Created by Sanil on 2/20/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("CarPoolService",CarPoolService)

    function CarPoolService(){

        var currentCarPools = [
            {"_id": "000", "userId":"123", "city":"Boston", "source": "Waltham", "destination": "Longwood", "date": "12/03/2016", "time": "03:00 pm",
                "carInfo": "XUV","basePrice":"$10", "noOfSeats": "4", "comments":"Please Notify in Advance like a day before"},
            {"_id": "010","userId":"123", "city":"Boston", "source": "Bedford", "destination": "Salem", "date": "17/03/2016", "time": "04:00 pm",
                "carInfo": "Chevrolet Beat","basePrice":"$7", "noOfSeats": "2", "comments":"Ping me asap!!"},
            {"_id": "020","userId":"234", "city":"Boston", "source": "Westford", "destination": "Umass", "date": "17/03/2016", "time": "07:00 pm",
                "carInfo": "Toyota Prius", "basePrice":"$9", "noOfSeats": "3", "comments":"Time flexible can be adjusted"}
        ];

        var api = {
            createCarPoolByUser: createCarPoolByUser,
            findAllCarPoolByUser: findAllCarPoolByUser,
            deleteCarPoolById: deleteCarPoolById,
            updateCarPoolById: updateCarPoolById,
            findCarPoolBySourceDestination: findCarPoolBySourceDestination,
            findCarPoolByCity: findCarPoolByCity
        };

        return api;

        // function to create Carpool for all user
        function createCarPoolByUser(userId, pool, callback){
            pool._id=(new Date).getTime();
            pool.userId=userId;
            pool.city="Boston";
            currentCarPools.push(pool);
            callback(pool);
        }


        // functions finds all CarPool's created by user
        function findAllCarPoolByUser(userId, callback){
            var userCarPools=[];
            for(var i=0;i<currentCarPools.length;i++){
                if(currentCarPools[i].userId == userId){
                    userCarPools.push(currentCarPools[i]);
                }
            }
            callback(userCarPools);
        }

        // functions finds all CarPool's by source and destination
        function findCarPoolBySourceDestination(source, destination, callback){
            var carPools=[];
            for(var i=0;i<currentCarPools.length;i++){
                if(currentCarPools[i].source == source && currentCarPools[i].destination == destination){
                    carPools.push(currentCarPools[i]);
                }
            }
            callback(carPools);
        }

        // functions finds all CarPool's by city
        function findCarPoolByCity(city, callback){
            var carPools=[];
            for(var i=0;i<currentCarPools.length;i++){
                if(currentCarPools[i].city == city){
                    carPools.push(currentCarPools[i]);
                }
            }
            callback(carPools);
        }


        // function to delete CarPool by id
        function deleteCarPoolById(carPoolId,callback){
            for(var i=0;i<currentCarPools.length;i++) {
                if(currentCarPools[i]._id == carPoolId)
                {
                    currentCarPools.splice(i,1);
                }
            }
            callback(userCarPools);
        }

        // function updates the CarPool by its id
        function updateCarPoolById(carPoolId,pool,callBack){
            for(var i=0;i<currentCarPools.length;i++) {
                if(currentCarPools[i]._id == carPoolId){
                    currentCarPools[i].basePrice=pool.basePrice;
                    currentCarPools[i].carInfo=pool.carInfo;
                    currentCarPools[i].comments=pool.comments;
                    currentCarPools[i].date=pool.date;
                    currentCarPools[i].destination=pool.destination;
                    currentCarPools[i].source=pool.source;
                    currentCarPools[i].time=pool.time;
                    currentCarPools[i].noOfSeats=pool.noOfSeats;
                    break;
                }
            }
            callBack(currentCarPools[i]);
        }

    }

})();