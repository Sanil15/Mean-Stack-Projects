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
        vm.userDetail = vm.userDetail;


        var users;
        function init() {

            UserService.findAllUsers()
                .then(function (response){
                    //console.log("Hi");
                    vm.users=response.data;
                    users=response.data;
                });
        }

        init();


        function deleteUser(index){

            var userList;
            UserService.findAllUsers()
                .then(function (response){
                    //console.log("Hi");
                    userList=response.data;
                    console.log(userList);
                });

            UserService.deleteUserById(userList[index]._id)
                .then(function (response){
                    init();
                    vm.reviews=null;
                    vm.user=null;
                })

        }

        function userDetail(index){

            var userList;
            UserService.findAllUsers()
                .then(function (response){
                    //console.log("Hi");
                    userList=response.data;
                });

            var user=userList[index];

            ReviewService.findAllReviewsForUser(user.userName)
                .then(function (response){
                    console.log(response.data);
                    vm.reviews=response.data;
                });
        }
    }
})();