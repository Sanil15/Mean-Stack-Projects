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

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }

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
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/showprofile/:username", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/carpool", {
                templateUrl: "views/carpool/carpool.view.html",
                controller: "CarPoolController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/usercarpool", {
                templateUrl: "views/carpool/usercarpool.view.html",
                controller: "UserCarPoolController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/ratingcrud", {
                templateUrl: "views/rating/ratingcrud.view.html",
                controller: "ReviewCRUDController",
                controllerAs: "model",
            })
            .when("/carpoolcrud", {
                templateUrl: "views/carpool/carpoolcrud.view.html",
                controller: "CarPoolCRUDController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/message", {
                templateUrl: "views/message/message.view.html",
                controller: "MessageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/searchresults/:id", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/searchlist/:queryString", {
                templateUrl: "views/search/searchlist.view.html",
                controller: "SearchListController",
                controllerAs: "model"
            })
            .when("/chat", {
                templateUrl: "views/chat/chat.view.client.html",
                controller: "ChatController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home",
                resolve:{
                    getLoggedIn: getLoggedIn
                }
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }


    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin')
            .success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.user = user;
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    $rootScope.error = 'You need to log in.';
                    deferred.reject();
                    $location.url('/home');
                }
            });

        return deferred.promise;
    };

})();