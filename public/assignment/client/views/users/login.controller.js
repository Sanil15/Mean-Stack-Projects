/**
 * Created by Sanil on 2/18/2016.
 */
(function (){

    'use strict';

    angular.module("FormBuilderApp")
           .controller("LoginController",LoginController);

    function LoginController($scope, UserService, $location){

        var vm=this;

        vm.login=login;

        //$scope.login=login;

        function init(){

        }

        // function for checking login of a controller
        function login(username,password){
            //console.log(username,password);
            UserService.findUserByUsernameAndPassword(username,password,render);
        }

        // callback of a function for login
        function render(user) {
            if(user != null){
                UserService.setCurrentUser(user);
                //console.log(user);
                $location.path("/profile");
            }
        }
    }
})();