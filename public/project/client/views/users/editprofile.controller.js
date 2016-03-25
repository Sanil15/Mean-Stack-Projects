/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("EditProfileController",EditProfileController)

    function EditProfileController(UserService, $location){

        var vm = this;

        vm.update = update;

        function init() {
        vm.user=UserService.getCurrentUser();
        }

        init();

        // function to update a user
        function update(user) {
                UserService.updateUser(user._id, user)
                    .then(function (response) {
                        UserService.setCurrentUser(response.data);
                        $location.path("/showprofile");
                    });

        }
    }
})();