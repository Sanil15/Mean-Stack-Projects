/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("AdminController",AdminController)

    function AdminController($scope, UserService, $location, ReviewService) {

        $scope.deleteUser=deleteUser;
        $scope.userDetails=userDetails;

        UserService.findAllUsers(renderUsers);
        //console.log($rootScope);

        function renderUsers(list){
            $scope.users=list;
        }

        function deleteUser(index){
            var a;
            UserService.findAllUsers(getList);

            function getList(list){
                a=list;
            }
            UserService.deleteUserById(a[index]._id,renderUsers);
            $scope.reviews=null;
            $scope.user=null;
        }

        function userDetails(index){
            var a;
            UserService.findAllUsers(getList);

            function getList(list){
                a=list;
            }
            $scope.user=a[index];

            ReviewService.findAllReviewsForUser(a[index].userName,renderUser)

            function renderUser(list){
                console.log(list);
                $scope.reviews=list;
            }

        }



    }


})();