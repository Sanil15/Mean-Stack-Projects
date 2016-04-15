/**
 * Created by Sanil on 4/13/2016.
 */
/**
 * Created by Sanil on 3/26/2016.
 */
(function () {

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("SearchListController", SearchListController)

    function SearchListController($http, CarPoolService, UserService, $location, $routeParams) {

        var vm=this;
        vm.details = details;
        vm.userProfile=userProfile;

        function init() {
            var city=$routeParams.queryString;

            CarPoolService.findCarPoolByCity(city)
                .then(function(response){
                    vm.carPools=response.data;
                    vm.size=response.data.length;
                });
        }

        init();

        function details(pool){
         $location.path("/searchresults/"+pool._id);

        }

        function userProfile(userId){
            console.log(userId);
            $location.path("/showprofile/"+ userId);
        }



    }}())