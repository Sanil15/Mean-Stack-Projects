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

    function UserCarPoolController(CarPoolService, UserService,$location){

        var vm = this;

        vm.deleteCarPool=deleteCarPool;
        vm.updateCarPool=updateCarPool;
        vm.selectCarPool=selectCarPool;

        var pools=null;
        function init() {
            vm.selectedPool=null;
            vm.selectedPoolId = -1;
            var autocomplete1 = new google.maps.places.Autocomplete(document.getElementById("origin-input"));
            var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById("destination-input"));

                UserService.getCurrentUser()
                    .then(function(response){
                        CarPoolService.findAllCarPoolByUser(response.data._id)
                            .then(function(respons){
                                vm.carPools=respons.data;
                                for(var i=0;i<vm.carPools.length;i++){
                                    vm.carPools[i].date = new Date(vm.carPools[i].date);

                                }
                                pools=respons.data;
                                vm.selectedPool=null;
                            });
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
             vm.selectedPool = {
                 "source":pools[index].source,
                 "destination":pools[index].destination,
                 "date":pools[index].date,
                 "time":pools[index].time,
                 "carInfo":pools[index].carInfo,
                 "basePrice":pools[index].basePrice,
                 "noOfSeats":pools[index].noOfSeats
             }
        }

        function updateCarPool(selectedPool){
            selectedPool.source = document.getElementById("origin-input").value;
            selectedPool.destination = document.getElementById("destination-input").value;
            CarPoolService.updateCarPoolById(vm.selectedPoolId,selectedPool)
                .then(function(response){
                    console.log("hi");
                    init();
                });
        }

    }
})();