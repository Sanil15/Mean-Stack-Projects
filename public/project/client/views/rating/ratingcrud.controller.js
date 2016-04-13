(function (){
    angular
        .module("CarPoolApp")
        .controller("ReviewCRUDController",ReviewCRUDController);

    function ReviewCRUDController($location, UserService, ReviewService){

        var vm = this;

        vm.createReview=createReview;
        vm.deleteReview=deleteReview;
        vm.selectReview=selectReview;
        vm.updateReview=updateReview;

        function init() {
            vm.selectedReviewId=-1;

            UserService.findAllUsers()
                .then(function (response){
                    //console.log(response.data);
                    vm.userList=response.data;
                });

            ReviewService.findAllReviews()
                .then(function(response){
                    //console.log(response.data);
                    vm.reviews=response.data;
                    vm.review=null;
                    vm.selectedReview=null;
                    vm.selectedReviewId=-1
                });
        }

        init();

        function createReview(){
            //console.log($scope.msg);
            ReviewService.createReview(vm.review)
                .then(function(response){


                })
                .then(function(response){
                    //console.log(response.data);
                    vm.reviews=response.data;
                    vm.review=null;
                    vm.selectedReview=null;
                    vm.selectedReviewId=-1
                });
        }

        function deleteReview(index){

            ReviewService.deleteReviewById(vm.reviews[index]._id)
                .then(function(response){
                    if(response.data)
                        return  ReviewService.findAllReviews();
                })
                .then(function(response){
                    //console.log(response.data);
                    vm.reviews=response.data;
                    vm.review=null;
                    vm.selectedReview=null;
                    vm.selectedReviewId=-1
                });
        }


        function selectReview(index){

            var rat={
                "rating": vm.reviews[index].rating,
                "fromUser": vm.reviews[index].fromUser,
                "toUser": vm.reviews[index].toUser,
                "review":vm.reviews[index].review
            }
            vm.selectedReview=rat;
            vm.selectedReviewId=vm.reviews[index]._id;
        }

        function updateReview(review){
            ReviewService.updateReviewById(vm.selectedReviewId,review)
                .then(function(response){
                    if(response.data)
                        return  ReviewService.findAllReviews();
                })
                .then(function(response){
                    //console.log(response.data);
                    vm.reviews=response.data;
                    vm.review=null;
                    vm.selectedReview=null;
                    vm.selectedReviewId=-1
                });
        }
    }
})();