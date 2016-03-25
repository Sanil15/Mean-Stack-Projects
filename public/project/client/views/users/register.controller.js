/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("RegisterController",RegisterController)

        function RegisterController( UserService, $location){

            var vm = this;

            vm.register = register;

            function init() {

            }

            init();

            // function to register a current user
            function register(user,confirmPassword){

                if(user.password==confirmPassword){

                    UserService.createUser(user)
                        .then(function (response){
                                UserService.setCurrentUser(response.data);
                                $location.url("/showprofile");
                        });
                }
            }

        }

})();