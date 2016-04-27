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
        vm.findDetail = findDetail;
        vm.makeAdmin = makeAdmin;
        vm.userProfile=userProfile;

        function init() {

            UserService.findAllUsers()
                .then(function (response){
                    //console.log("Hi");
                    vm.users=response.data;
                },
                function (err) {
                    vm.error = "You Do Not Have Admin Priveleges";
                })};

        init();

        function makeAdmin(id){
            UserService.makeAdmin(id)
                .then(function(response){
                    if(response.data)
                    init()
                });
        }


        function deleteUser(index){
            UserService.deleteUserById(vm.users[index]._id)
                .then(function (response){
                    init();
                    vm.reviews=null;
                    vm.user=null;
                })

        }

        function findDetail(index){

            vm.user=vm.users[index];
            ReviewService.findAllReviewsForUser(vm.users[index].userName)
                .then(function (response){
                    console.log(response.data);
                    vm.reviews=response.data;
                });
        }

        function userProfile(userId){
            console.log(userId);
            $location.path("/showprofile/"+ userId);
        }

    }
})();