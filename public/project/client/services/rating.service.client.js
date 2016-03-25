/**
 * Created by Sanil on 3/9/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("ReviewService",ReviewService);

    function ReviewService($http){

        var api = {
            createReview: createReview,
            findAllReviews: findAllReviews,
            findAllReviewsForUser: findAllReviewsForUser,
            deleteReviewById: deleteReviewById,
            updateReviewById: updateReviewById
        };

        return api;

        function findAllReviews(){
            return $http.get("/api/project/rating");
        }

        function createReview(review){
            return $http.post("/api/project/rating",review);
        }

        function findAllReviewsForUser(userName){
            return $http.get("/api/project/rating?&userName="+userName);
        }

        function deleteReviewById(reviewId){
            return $http.delete("/api/project/rating/"+reviewId);
        }

        function updateReviewById(ratingId,rat){
            return $http.put("/api/project/rating/"+ratingId,rat);
        }


    }

})();