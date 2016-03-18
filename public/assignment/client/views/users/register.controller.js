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

                user.firstName = null;
                user.lastName = null;

                UserService.createUser(user)
                    .then(function (response) {
                        var users=response.data;
                        console.log(users[users.length]);
                        UserService.setCurrentUser(users[users.length]);
                        $location.url("/profile");
                    });
            }
        }

})();