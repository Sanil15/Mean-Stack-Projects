/**
 * Created by Sanil on 2/19/2016.
 */
(function () {

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

        var api = {
            findUserByCredentials : findUserByCredentials,
            createUser : createUser,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            logout:logout,
            findUserById: findUserById,

            adminFindAllUsers : adminFindAllUsers,
            adminDeleteUserById : adminDeleteUserById,
            adminFindUserById:adminFindUserById,
            adminUpdateUser: adminUpdateUser,
            adminCreateUser: adminCreateUser

         };

        return api;

        // Setter function to set the $rootScope of current user
        function setCurrentUser (user) {
            $rootScope.user = user;
        }

        // Getter function to get the $rootScope of current user
        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        // function to find Username and Password
        function findUserByCredentials(username, password){
            return $http.post("/api/assignment/login?"+"username=" + username + "&password=" + password);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/"+userId);
        }

        // function creates a set of users
        function createUser(user){
           return $http.post("/api/assignment/register",user);
        }

        // function to update a user and its various attributes
        function updateUser(userId,user){
            return $http.put("/api/assignment/user/"+userId,user);
        }

        //ADMIN FUNCTIONS

        // function returns all set of users
        function adminFindAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }

        function adminFindUserById(userId){
            return $http.get("/api/assignment/admin/user/"+userId);
        }


        function adminUpdateUser(userId,user){
            return $http.put("/api/assignment/admin/user/"+userId,user);
        }

        function adminCreateUser(user){
            return $http.post("/api/assignment/admin/user",user);
        }

        // function deletes a user by userId
        function adminDeleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

    }


})();
