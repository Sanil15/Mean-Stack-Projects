/**
 * Created by Sanil on 2/18/2016.
 */
(function () {

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("HomeController", HomeController)

    function HomeController($scope, CarPoolService, UserService, $location) {

        var vm = this;
        vm.findCarPool = findCarPool;
        vm.details=details;

        function init() {
            vm.carPools=null;
        }

        init();

        function findCarPool(city){
            CarPoolService.findCarPoolByCity(city)
                .then(function(response){
                   vm.carPools=response.data;
                });
        }

        function details(index){

            $location.path("/searchresults/"+vm.carPools[index]._id);

            /*if(UserService.getCurrentUser()==null){
                $location.path("/login");
            }

            else{
                $location.path("/searchresults?id="+vm.carPools[index]._id);
            }*/

        }


        var cities = [
            {
                city: 'India',
                desc: 'This is the best country in the world!',
                lat: 23.200000,
                long: 79.225487
            },
            {
                city: 'New Delhi',
                desc: 'The Heart of India!',
                lat: 28.500000,
                long: 77.250000
            },
            {
                city: 'Mumbai',
                desc: 'Bollywood city!',
                lat: 19.000000,
                long: 72.90000
            },
            {
                city: 'Kolkata',
                desc: 'Howrah Bridge!',
                lat: 22.500000,
                long: 88.400000
            },
            {
                city: 'Chennai  ',
                desc: 'Kathipara Bridge!',
                lat: 13.000000,
                long: 80.250000
            }
        ];

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(25, 80),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info) {

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);

        }

        for (var i = 0; i < cities.length; i++) {
            createMarker(cities[i]);
        }

        $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

    }
})();