/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("RegisterController",RegisterController)

        function RegisterController($scope, UserService, $location){

            $scope.register=register;

            // function to register a current user
            function register(password,confirmPassword){

                if(password==confirmPassword){

                    $scope.user._id=(new Date).getTime();
                    $scope.user.roles=["general"];
                    UserService.createUser($scope.user, render);
                }
            }

            // function for callBack for registered user
            function render(user) {
                UserService.setCurrentUser(user);
                console.log(user);
                $location.path("/showprofile");
            }

        }

})();