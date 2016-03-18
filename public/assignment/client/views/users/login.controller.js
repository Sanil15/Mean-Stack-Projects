/**
 * Created by Sanil on 2/18/2016.
 */
(function (){

    'use strict';

    angular.module("FormBuilderApp")
           .controller("LoginController",LoginController);

    function LoginController(UserService, $location){

        var vm=this;

        vm.login=login;

        function init(){

        }

        // function for checking login of a controller
        function login(user){
            //console.log(username,password);
            if(!user)
            {
                return;
            }

            UserService
                .findUserByCredentials(user.username,user.password)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();