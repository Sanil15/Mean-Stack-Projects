/**
 * Created by Sanil on 3/1/2016.
 */
(function (){

    'use strict';

    angular.module("CarPoolApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, UserService, $location){

        $scope.login=login;

        // function for checking login of a controller
        function login(email,password){
            //console.log(username,password);
            UserService.findUserByEmailAndPassword(email,password,render);
        }

        // callback of a function for login
        function render(user) {
            if(user != null){
                UserService.setCurrentUser(user);
                console.log(user);
                $location.path("/showprofile");
            }
        }
    }
})();