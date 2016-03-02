/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .config(Configure);

    // Configuration File
    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                //controller: "views/home/home.controller.js"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                //controller: "views/admin/admin.controller.js"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/editprofile", {
                templateUrl: "views/users/editprofile.view.html",
                controller: "EditProfileController"
            })
            .when("/showprofile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/carpool", {
                templateUrl: "views/carpool/carpool.view.html",
                controller: "CarPoolController"
            })
            .when("/usercarpool", {
                templateUrl: "views/carpool/usercarpool.view.html",
                controller: "UserCarPoolController"
            })
            .when("/rating", {
                templateUrl: "views/rating/rating.view.html",
                //controller: "CarPoolController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();