/**
 * Created by Sanil on 3/1/2016.
 */
(function(){

    'use strict'

    angular
        .module("CarPoolApp")
        .controller("CarPoolController",CarPoolController)

        function CarPoolController($scope,UserService, CarPoolService, $location){

            $scope.createCarPool=createCarPool;

            function createCarPool(){
                var userId=UserService.getCurrentUser();
                CarPoolService.createCarPoolByUser(userId,$scope.pool,render);
            }

            // function for callBack for registered user
            function render(pool) {
                console.log(pool);
                $location.path("/home");
            }

        }

})();