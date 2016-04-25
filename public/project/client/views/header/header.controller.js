/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("HeaderController",HeaderController)

    function HeaderController($location, UserService) {

        var vm= this;

        vm.logout=logout;
        vm.userProfile =userProfile;

        function init(){
            vm.$location=$location;
        }

        init();

        function userProfile(){
            UserService.getCurrentUser()
                .then(function(response){
                    $location.url("/showprofile/"+response.data._id);
                });
        }

        // function to logout current user
        function logout(){
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();