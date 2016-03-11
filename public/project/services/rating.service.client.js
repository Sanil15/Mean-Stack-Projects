/**
 * Created by Sanil on 3/9/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("ReviewService",ReviewService);

    function ReviewService(){

        var reviewList = [
            {"_id": "000", "review": "Nice!!!", "fromUser": "Alice123", "toUser": "Bob_Hope","rating": 3.5 },
            {"_id": "010", "review": "Easy Goin", "fromUser": "Bob_Hope", "toUser": "CharlieCool","rating": 5 },
            {"_id": "020", "review": "Great", "fromUser": "CharlieCool", "toUser": "Alice123","rating": 4.4}
        ];

        var api = {
            createReview: createReview,
            findAllReviews: findAllReviews,
            findAllReviewsForUser: findAllReviewsForUser,
            deleteReviewById: deleteReviewById,
        };

        return api;

        function findAllReviews(callback){
            callback(reviewList);
        }

        function createReview(review, callback){
            review._id=(new Date).getTime();
            reviewList.push(review);
            callback(reviewList);
        }

        function findAllReviewsForUser(userName, callback){
            var userReviews=[];
            for(var i=0;i<reviewList.length;i++){
                if(reviewList[i].toUser == userName){
                    userReviews.push(reviewList[i]);
                }
            }
            callback(userReviews);
        }

        function deleteReviewById(reviewId,callback){
            for(var i=0;i<reviewList.length;i++) {
                if(reviewList[i]._id == reviewId)
                {
                    reviewList.splice(i,1);
                }
            }
            callback(reviewList);
        }


    }

})();