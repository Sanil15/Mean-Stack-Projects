/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("ProfileController",ProfileController)

    function ProfileController(UserService, $location) {

        var vm = this;

        function init() {
            vm.user=UserService.getCurrentUser();
        }

        init();

    }


})();