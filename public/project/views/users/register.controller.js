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
            function register(username,password,confirmPassword,email){

                var user;

                if(password==confirmPassword){
                    user={
                        "_id": (new Date).getTime(),
                        "firstName":null,
                        "lastName":null,
                        "username":username,
                        "password":password,
                        "roles": []};

                UserService.createUser(user, render);
                }
            }

            // function for callBack for registered user
            function render (user) {
                UserService.setCurrentUser(user);
                //console.log(user);
                $location.path("/profile");
            }

        }

})();