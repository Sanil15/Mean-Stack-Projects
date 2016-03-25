/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("AdminController",AdminController)

    function AdminController(UserService, $location, ReviewService) {

        var vm = this;

        vm.deleteUser = deleteUser;
        vm.userDetails = vm.userDetails;


        var users;
        function init() {

            UserService.findAllUsers()
                .then(function (response){
                    vm.users=response.data;
                    users=response.data;
                });
        }

        init();


        function deleteUser(index){

            UserService.deleteUserById(users[index]._id)
                .then(function (response){
                    init();
                    vm.reviews=null;
                    vm.user=null;
                })

        }

        function userDetails(index){
            vm.user=users[index];

            ReviewService.findAllReviewsForUser(users[index].userName)
                .then(function (response){
                    vm.reviews=response.data;
                });
        }
    }
})();