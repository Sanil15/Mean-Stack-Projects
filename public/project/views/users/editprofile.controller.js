/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("EditProfileController",EditProfileController)

    function EditProfileController($scope, UserService, $location){
        $scope.user=UserService.getCurrentUser();
        //console.log($rootScope);

        $scope.update=update;

        // function to update a user
        function update(user) {
            console.log(user);
            UserService.updateUser(user._id,user,render);
        }

        // callback function to update a user
        function render (user) {
            UserService.setCurrentUser(user);
            //console.log(user);
            $location.path("/showprofile");
        }
    }
})();