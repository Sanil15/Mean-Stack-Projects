/**
 * Created by Sanil on 2/19/2016.
 */
(function(){
    angular.module("MovieApp")
           .controller("NavController",navController);

    function navController($scope, $location){
        $scope.$location=$location;
    }

})();