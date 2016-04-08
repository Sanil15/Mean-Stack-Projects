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
            var user=UserService.getCurrentUser();

            vm.selectedUserId=user._id;
            vm.user = {
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                country : user.country,
                state : user.state,
                address : user.address,
                city : user.city,
                contact : user.contact,
                dob : new Date(user.dob),
                zipCode : user.zipCode
            }

        }

        init();

        // function to update a user
        function update(user) {
            UserService.updateUser(vm.selectedUserId, user)
                .then(function (response) {
                    return UserService.findUserById(vm.selectedUserId);
                })
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.path("/showprofile");
                    }
                });
        }
    }
})();