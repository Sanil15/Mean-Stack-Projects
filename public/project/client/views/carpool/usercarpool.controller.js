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

        var vm = this;

        vm.deleteCarPool=deleteCarPool;
        vm.updateCarPool=updateCarPool;
        vm.selectCarPool=selectCarPool;

        var pools=null;
        function init() {
            vm.selectedPool=null;

            var autocomplete1 = new google.maps.places.Autocomplete(document.getElementById("origin-input"));
            var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById("destination-input"));

            if(UserService.getCurrentUser()!=null)
                CarPoolService.findAllCarPoolByUser(UserService.getCurrentUser()._id)
                    .then(function(response){
                        vm.carPools=response.data;
                        pools=response.data;
                        vm.selectedPool=null;
                    });

        }

        init();


        function deleteCarPool(index){

            CarPoolService.deleteCarPoolById(pools[index]._id)
                .then(function (response){
                    init();
                    vm.selectedPool=null;
                });
        }


        function selectCarPool(index){
             vm.selectedPoolId=pools[index]._id;
             vm.selectedPool=pools[index];
        }

        function updateCarPool(selectedPool){
            selectedPool.source = document.getElementById("origin-input").value;
            selectedPool.destination = document.getElementById("destination-input").value;
            CarPoolService.updateCarPoolById(selectedPool._id,selectedPool)
                .then(function(response){
                    init();
                });
        }

    }
})();