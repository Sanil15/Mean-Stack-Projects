/**
 * Created by Sanil on 2/19/2016.
 */
(function(){
    angular.module("MovieApp")
           .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/search",{
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .otherwise({
               redirectTo: "/home"
            });
    }

})();