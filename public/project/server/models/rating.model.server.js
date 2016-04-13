/**
 * Created by Sanil on 3/23/2016.
 */
var mongoose=require('mongoose');

// load the promise library
var q = require("q");

module.exports = function(db) {

    var RatingSchema = require("./rating.schema.server.js")();
    var RatingModel = mongoose.model("RatingModel",RatingSchema)


    var api = {
        createReview: createReview,
        findAllReviews: findAllReviews,
        findAllReviewsForUser: findAllReviewsForUser,
        deleteReviewById: deleteReviewById,
        updateReviewById: updateReviewById,
        findReviewById:findReviewById
    };

    return api;

    function findAllReviews(){
        var deferred = q.defer();
        RatingModel
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

    function createReview(review){
        console.log(review);
        var deferred = q.defer();
        RatingModel
            .create(review,
                function (err, stats){
                    if(!err) {

                        deferred.resolve(stats);
                    }
                    else{
                        console.log(err);
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function findAllReviewsForUser(userName){
        var deferred = q.defer();
        RatingModel
            .find(
                {toUser: userName},
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

    function findReviewById(ratingId){
        var deferred = q.defer();
        RatingModel
            .findById(ratingId,
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

    function deleteReviewById(reviewId){
        return RatingModel.remove().where("_id").equals(reviewId);
    }


    function updateReviewById(ratingId,rat){
        var deferred = q.defer();
        RatingModel
            .update(
                {_id: ratingId},
                {$set: {
                    "rating": rat.rating,
                    "review": rat.review
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