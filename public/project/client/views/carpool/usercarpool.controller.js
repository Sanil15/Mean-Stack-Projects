/**
 * Created by Sanil on 3/1/2016.
 */
/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("UserCarPoolController",UserCarPoolController)

    function UserCarPoolController($scope,CarPoolService, UserService,$location){

        $scope.deleteCarPool=deleteCarPool;
        $scope.updateCarPool=updateCarPool;
        $scope.selectCarPool=selectCarPool;
        $scope.selectedPool=null;


        if(UserService.getCurrentUser()!=null)
        CarPoolService.findAllCarPoolByUser(UserService.getCurrentUser()._id,renderUserCarPools);

        var autocomplete1 = new google.maps.places.Autocomplete(document.getElementById("origin-input"));
        var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById("destination-input"));


        function renderUserCarPools(pools) {
            console.log(pools);
            $scope.carPools=pools;
            $scope.selectedPool=null;
        }

        function deleteCarPool(index){
            CarPoolService.findAllCarPoolByUser(UserService.getCurrentUser()._id,getList);
            var a;
            function getList(list){
                a=list;
            }
            CarPoolService.deleteCarPoolById(a[index]._id,a[index].userId,renderUserCarPools);
        }


        function selectCarPool(index){

            CarPoolService.findAllCarPoolByUser(UserService.getCurrentUser()._id,getList);
            var a;
            function getList(list){
                a=list;
            }
            $scope.selectedPool=a[index];
        }

        function updateCarPool(){
            $scope.selectedPool.source = document.getElementById("origin-input").value;
            $scope.selectedPool.destination = document.getElementById("destination-input").value;
            CarPoolService.updateCarPoolById($scope.selectedPool._id,$scope.selectedPool,renderUserCarPools);
        }

    }
})();