/**
 * Created by Sanil on 3/26/2016.
 */
(function () {

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("SearchController", SearchController)

    function SearchController($http, CarPoolService, UserService, $location, $routeParams) {

        var vm = this;

        vm.userProfile=userProfile;

        var URL="http://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";

        function init() {
            console.log($routeParams.id);
            CarPoolService.findCarPoolById($routeParams.id)
                .then(function(response){
                    console.log(response.data);
                    vm.selectedPool=response.data;
                    details(response.data);
                    getMap(response.data);
                });


        }

        init();



        function getMap(pool){

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
                    origin: pool.source,
                    destination: pool.destination,
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

        function details(pool){

            var a=URL.replace("ORIGIN",pool.source);
            var b=a.replace("DESTINATION",pool.destination);


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

            function render(response){
                console.log(response);
                vm.legs = response.routes[0].legs[0];
            }
        }

        function userProfile(userId){
            console.log(userId);
            $location.path("/showprofile/"+ userId);
        }

    }}())