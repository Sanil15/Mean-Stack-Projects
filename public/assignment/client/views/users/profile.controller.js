/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController)

    function ProfileController(UserService, $location){

        var vm=this;

        vm.update=update;

        function init(){
            console.log("HERE"+UserService.getCurrentUser());
            vm.user=UserService.getCurrentUser();
        }
        init();

        // function to update a user
        function update(user) {
            //console.log("INVOKED"+user._id);
            UserService.updateUser(user._id,user)
                .then(function(response){
                //console.log("profile.controller.js"+response);
                UserService.setCurrentUser(response.data);
                $location.url("/profile");
            });
        }
    }
})();