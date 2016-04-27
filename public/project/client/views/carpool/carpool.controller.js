/**
 * Created by Sanil on 3/1/2016.
 */
(function(){

    'use strict'

    angular
        .module("CarPoolApp")
        .controller("CarPoolController",CarPoolController)

        function CarPoolController(UserService, CarPoolService, $location){


            var vm = this;

            vm.createCarPool = createCarPool;




            function init() {
                initMap();

                vm.x = 1;
                vm.initMap = initMap;

                $(document).ready(function() {
                    $('.input-group input[required], .input-group textarea[required], .input-group select[required]').on('keyup change', function() {
                        var $form = $(this).closest('form'),
                            $group = $(this).closest('.input-group'),
                            $addon = $group.find('.input-group-addon'),
                            $icon = $addon.find('span'),
                            state = false;

                        if (!$group.data('validate')) {
                            state = $(this).val() ? true : false;
                        }else if ($group.data('validate') == "email") {
                            state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
                        }else if($group.data('validate') == 'phone') {
                            state = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test($(this).val())
                        }else if ($group.data('validate') == "length") {
                            state = $(this).val().length >= $group.data('length') ? true : false;
                        }else if ($group.data('validate') == "number") {
                            state = !isNaN(parseFloat($(this).val())) && isFinite($(this).val());
                        }

                        if (state) {
                            $addon.removeClass('danger');
                            $addon.addClass('success');
                            $icon.attr('class', 'glyphicon glyphicon-ok');
                        }else{
                            $addon.removeClass('success');
                            $addon.addClass('danger');
                            $icon.attr('class', 'glyphicon glyphicon-remove');
                        }

                        if ($form.find('.input-group-addon.danger').length == 0) {
                            $form.find('[type="submit"]').prop('disabled', false);
                            vm.x=0;
                        }else{
                            $form.find('[type="submit"]').prop('disabled', true);
                            vm.x=1;
                        }
                    });

                    $('.input-group input[required], .input-group textarea[required], .input-group select[required]').trigger('change');


                });

                if(vm.selectedPool!=null) {
                    vm.pool=vm.selectedPool;
                }
            }

            init();

            function createCarPool(newPool){

                    console.log(newPool);

                if(vm.x == 0)
                   UserService.getCurrentUser()
                        .then(function(response){
                            newPool.source = document.getElementById("origin-input").value;
                            newPool.destination = document.getElementById("destination-input").value;
                            return CarPoolService.createCarPoolByUser(response.data._id, newPool)
                                .then(function(response){
                                    $location.path("/usercarpool");
                                })
                        })

            }

            function initMap() {

                var origin_place_id = null;
                var destination_place_id = null;
                var travel_mode = google.maps.TravelMode.DRIVING;
                var map = new google.maps.Map(document.getElementById('map-info'), {
                    mapTypeControl: false,
                    center: {lat: -33.8688, lng: 151.2195},
                    zoom: 13
                });

                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                directionsDisplay.setMap(map);

                var origin_input = document.getElementById('origin-input');
                var destination_input = document.getElementById('destination-input');


                var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
                origin_autocomplete.bindTo('bounds', map);

                var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
                destination_autocomplete.bindTo('bounds', map);


                function expandViewportToFitPlace(map, place) {
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);
                    }
                }

                origin_autocomplete.addListener('place_changed', function() {
                    var place = origin_autocomplete.getPlace();
                    if (!place.geometry) {
                        window.alert("Autocomplete's returned place contains no geometry");
                        return;
                    }
                    expandViewportToFitPlace(map, place);

                    // If the place has a geometry, store its place ID and route if we have
                    // the other place ID
                    origin_place_id = place.place_id;
                    route(origin_place_id, destination_place_id, travel_mode,
                        directionsService, directionsDisplay);
                });

                destination_autocomplete.addListener('place_changed', function() {
                    var place = destination_autocomplete.getPlace();
                    if (!place.geometry) {
                        window.alert("Autocomplete's returned place contains no geometry");
                        return;
                    }
                    expandViewportToFitPlace(map, place);

                    // If the place has a geometry, store its place ID and route if we have
                    // the other place ID
                    destination_place_id = place.place_id;
                    route(origin_place_id, destination_place_id, travel_mode,
                        directionsService, directionsDisplay);
                });


                function route(origin_place_id, destination_place_id, travel_mode,
                               directionsService, directionsDisplay) {
                    if (!origin_place_id || !destination_place_id) {
                        return;
                    }
                    directionsService.route({
                        origin: {'placeId': origin_place_id},
                        destination: {'placeId': destination_place_id},
                        travelMode: travel_mode
                    }, function(response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                }
            }
        }
})();