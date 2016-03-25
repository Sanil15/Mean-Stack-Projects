/**
 * Created by Sanil on 3/1/2016.
 */
(function (){

    'use strict';

    angular.module("CarPoolApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location){

        var vm=this;

        vm.login=login;

        function init() {

        }


        // function for checking login of a controller
        function login(user){

            if(!user)
            {
                return;
            }

            //console.log(username,password);
            UserService.findUserByCredentials(user.email,user.password)
                .then(function (response){
                        if(response.data !=null) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/showprofile");
                        }
                });

        }

    }
})();