/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController)

        function RegisterController(UserService, $location) {

            var vm = this;

            vm.register = register;

            function init() {

            }

            init();

            // function to register a current user
            function register(user) {
                //user.firstName = null;
                //user.lastName = null;
                UserService.createUser(user)
                    .then(
                        function (response) {
                            var user=response.data;
                            console.log(user);
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        },
                        function(error){
                            console.log(error);
                        }
                    );
            }
        }

})();