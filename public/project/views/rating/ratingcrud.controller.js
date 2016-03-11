(function (){
    angular
        .module("CarPoolApp")
        .controller("ReviewCRUDController",ReviewCRUDController);

    function ReviewCRUDController($scope, $location, UserService, ReviewService){

        $scope.createReview=createReview;
        $scope.deleteReview=deleteReview;
        $scope.selectReview=selectReview;
        $scope.updateReview=updateReview;
        $scope.selectedReviewId=-1;


        UserService.findAllUsers(renderUser);
        ReviewService.findAllReviews(renderReviews);

        function renderUser(list){
            //console.log(list);
            $scope.userList=list;
        }

        function renderReviews(list){
            $scope.reviews=list;
            $scope.review=null;
            $scope.selectedReview=null;
            $scope.selectedReviewId=-1;
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


        function selectReview(index){
            var a;
            ReviewService.findAllReviews(getList);
            function getList(list){
                a=list;
            }

            var rat={
                "rating": a[index].rating,
                "fromUser": a[index].fromUser,
                "toUser": a[index].toUser,
                "review":a[index].review
            }
            $scope.selectedReview=rat;

            $scope.selectedReviewId=a[index]._id;
        }

        function updateReview(){
            ReviewService.updateReviewById($scope.selectedReviewId,$scope.selectedReview,renderReviews);
        }


    }
})();