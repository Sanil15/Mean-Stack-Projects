/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController)

    function SidebarController($scope, UserService,$location){

        var vm= this;

        function init(){

        vm.$location=$location;
        }
        init();


    }

})();