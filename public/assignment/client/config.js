/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
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
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                //controller: "views/fields/field.controller.js"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();