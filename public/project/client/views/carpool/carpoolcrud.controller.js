(function() {

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("CarPoolCRUDController", CarPoolCRUDController)

    function CarPoolCRUDController($scope,$http,$location){

        $scope.createCarPool=createCarPool;
        $scope.details=details;
        $scope.carPools=[];
        $scope.selectedIndex=-1;

        var autocomplete1 = new google.maps.places.Autocomplete(document.getElementById("origin-input"));
        var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById("destination-input"));
        var URL="http://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";


        function createCarPool(){
            var origin=document.getElementById("origin-input").value;
            var destination=document.getElementById("destination-input").value;

            var pool={
                'origin': origin,
                'destination': destination
            };

            $scope.carPools.push(pool);
            $scope.source=null;
            $scope.destination=null;
            $scope.selectedIndex=-1;
        }


        function getMap(index){

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            $scope.show = 1;

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
            });

            directionsDisplay.setMap(map);

            document.getElementById('right-panel').innerHTML="";
            directionsDisplay.setPanel(document.getElementById('right-panel'));

            directionsService.route({
                    origin: $scope.carPools[index].origin,
                    destination: $scope.carPools[index].destination,
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

            $scope.selectedIndex=1;
            //console.log(origin);
            //console.log(destination);


            getMap(index);

            //initMap(index);

            var a=URL.replace("ORIGIN",$scope.carPools[index].origin);
            var b=a.replace("DESTINATION",$scope.carPools[index].destination);

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
                $scope.legs = response.routes[0].legs[0];
                }

            //$http.get(URL).success(renderData);

                /*var request = {
                    origin:origin,
                    destination:destination,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                var directionsService = new google.maps.DirectionsService;
                directionsService.route(request, renderData);*/

            function renderData(result, status){
                if (status == google.maps.DirectionsStatus.OK) {
                    //console.log(result);
                }
            }

            /*var service = new google.maps.DistanceMatrixService;
            service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, rederData2);

            function rederData2(response, status) {
                if (status !== google.maps.DistanceMatrixStatus.OK) {
                    alert('Error was: ' + status);
                } else {
                    //console.log(response);
                    $scope.data=response;
                    $location.path('/carpoolcrud').search({'response': response});
                }
            }*/

        }
    }

})()

