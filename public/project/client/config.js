/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .config(Configure);

    // Configuration File
    function Configure($routeProvider,$httpProvider) {


        //$httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.headers.common = 'Content-Type: application/json';
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];


        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/editprofile", {
                templateUrl: "views/users/editprofile.view.html",
                controller: "EditProfileController",
                controllerAs: "model"
            })
            .when("/showprofile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/carpool", {
                templateUrl: "views/carpool/carpool.view.html",
                controller: "CarPoolController",
                controllerAs: "model"
            })
            .when("/usercarpool", {
                templateUrl: "views/carpool/usercarpool.view.html",
                controller: "UserCarPoolController",
                controllerAs: "model"
            })
            .when("/rating", {
                templateUrl: "views/rating/rating.view.html",
                //controller: "CarPoolController"
            })
            .when("/ratingcrud", {
                templateUrl: "views/rating/ratingcrud.view.html",
                controller: "ReviewCRUDController",
                controllerAs: "model"
            })
            .when("/carpoolcrud", {
                templateUrl: "views/carpool/carpoolcrud.view.html",
                controller: "CarPoolCRUDController",
                controllerAs: "model"
            })
            .when("/message", {
                templateUrl: "views/message/message.view.html",
                controller: "MessageController",
                controllerAs: "model"
            })
            .when("/searchresults/:id", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();