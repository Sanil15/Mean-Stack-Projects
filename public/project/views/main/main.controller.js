/**
 * Created by Sanil on 2/19/2016.
 */
(function (){
    angular
        .module("CarPoolApp")
        .controller("MainController",MainController);

    function MainController($scope, $location){
        $scope.$location= $location;
    }
})();