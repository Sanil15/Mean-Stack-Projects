/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController)

    function HeaderController(UserService,$location){

        var vm= this;

        vm.logout=logout;

        function init(){
            vm.$location=$location;
        }

        init();
        
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