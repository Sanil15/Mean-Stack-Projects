/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("ProfileController",ProfileController)

    function ProfileController($scope, UserService, $location) {
        $scope.user = UserService.getCurrentUser();
        //console.log($rootScope);

    }


})();