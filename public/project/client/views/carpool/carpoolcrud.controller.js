(function() {

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("CarPoolCRUDController", CarPoolCRUDController)

    function CarPoolCRUDController($http,$location){

        var vm = this;

        vm.createCarPool=createCarPool;
        vm.details=details;


        function init() {
            vm.carPools = [];
            vm.selectedIndex = -1;
            var autocomplete1 = new google.maps.places.Autocomplete(document.getElementById("origin-input"));
            var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById("destination-input"));

        }

        init();


        var URL="http://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";


        function createCarPool(){
            var origin=document.getElementById("origin-input").value;
            var destination=document.getElementById("destination-input").value;

            var pool={
                'origin': origin,
                'destination': destination
            };

            vm.carPools.push(pool);
            vm.source=null;
            vm.destination=null;
            vm.selectedIndex=-1;
        }


        function getMap(index){

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            vm.show = 1;

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
            });

            directionsDisplay.setMap(map);

            document.getElementById('right-panel').innerHTML="";
            directionsDisplay.setPanel(document.getElementById('right-panel'));

            directionsService.route({
                    origin: vm.carPools[index].origin,
                    destination: vm.carPools[index].destination,
                    travelMode: google.maps.TravelMode.DRIVING},
                renderRouteMap);

            function renderRouteMap(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }

        }

        function details(index){

            vm.selectedIndex=1;
            //console.log(origin);
            //console.log(destination);


            getMap(index);

            //initMap(index);

            var a=URL.replace("ORIGIN",vm.carPools[index].origin);
            var b=a.replace("DESTINATION",vm.carPools[index].destination);

            //$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            //alert(b);

            var req = {
                method: 'POST',
                url: '/maps',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'test='+b ,
                //body:b
            }

            $http(req).success(render);

            //$http.post('/maps',{'test': "123"}).success(render);

            function render(response){
                console.log(response);
                vm.legs = response.routes[0].legs[0];
            }


        }
    }

})()

