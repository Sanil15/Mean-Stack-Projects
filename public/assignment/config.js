/**
 * Created by Sanil on 2/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/admin",{
                templateUrl: "admin.view.html"
            })
            .when("/register", {
                templateUrl: "register.view.html"
            })
            .when("/fields", {
                templateUrl: "fields.view.html",
                controller: "CourseController"
            })
            .when("forms", {
                templateUrl: forms.view.html",
                controller: ""
            })
            .when("/home", {
                templateUrl: "home.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();