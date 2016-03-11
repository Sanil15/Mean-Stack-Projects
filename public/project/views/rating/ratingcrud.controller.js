/**
 * Created by Sanil on 3/10/2016.
 */
(function (){
    angular
        .module("CarPoolApp")
        .controller("ReviewCRUDController",ReviewCRUDController);

    function ReviewCRUDController($scope, $location, UserService, ReviewService){

        $scope.createReview=createReview;
        $scope.deleteReview=deleteReview;

        UserService.findAllUsers(renderUser);
        ReviewService.findAllReviews(renderReviews);

        function renderUser(list){
            //console.log(list);
            $scope.userList=list;
        }

        function renderReviews(list){
            $scope.reviews=list;
            $scope.review=null;
        }

        function createReview(){
            //console.log($scope.msg);
            ReviewService.createReview($scope.review,renderReviews);
        }

        function deleteReview(index){
            var a;

            ReviewService.findAllReviews(getList);

            function getList(list){
                a=list;
            }

            ReviewService.deleteReviewById(a[index]._id,renderReviews);
        }

    }
})();