/**
 * Created by Sanil on 3/23/2016.
 */
var mock= require("./rating.mock.json");

// load the promise library
var q = require("q");

module.exports = function() {

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
        var reviews=mock;

        deferred.resolve(reviews);
        return deferred.promise;
    }

    function createReview(review){
        var deferred = q.defer();

        review._id=(new Date).getTime();
        mock.push(review);

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findAllReviewsForUser(userName){
        var deferred = q.defer();

        var userReviews=[];
        for(var i=0;i<mock.length;i++){
            if(mock[i].toUser == userName){
                userReviews.push(mock[i]);
            }
        }

        deferred.resolve(userReviews);
        return deferred.promise;
    }

    function findReviewById(ratingId){
        var deferred = q.defer();
        var review=null;
        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == ratingId)
            {
                review=mock[i];
                break;
            }
        }

        deferred.resolve(review);
        return deferred.promise;

    }

    function deleteReviewById(reviewId){
        var deferred = q.defer();

        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == reviewId)
            {
                mock.splice(i,1);
                break;
            }
        }

        return deferred.promise;
    }

    function updateReviewById(ratingId,rat){
        var deferred = q.defer();

        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == ratingId) {
                mock[i].rating=rat.rating;
                mock[i].review=rat.review;
                break;
            }
        }
        return deferred.promise;
    }

}