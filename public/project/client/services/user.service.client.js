/**
 * Created by Sanil on 2/19/2016.
 */
(function () {

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            findUserById: findUserById,
            logout: logout,
            findUserByUsername:findUserByUsername,
            makeAdmin: makeAdmin

         };

        return api;

        // Setter function to set the $rootScope of current user
        function setCurrentUser (user) {
            $rootScope.user = user;
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        // Getter function to get the $rootScope of current user
        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        // function to find Email and Password
        function findUserByCredentials(username, password){
           return $http.post("/api/project/login?"+"username=" + username + "&password=" + password);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?"+"username=" + username);
        }

        function findUserById(userId){
           return $http.get("/api/project/user/"+userId);
        }

        // function returns all set of users
        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        // function creates a set of users
        function createUser(user){
            return $http.post("/api/project/user",user);
        }

        // function deletes a user by userId
        function deleteUserById(userId){
            return $http.delete("/api/project/user/"+userId);
        }


        // function to update a user and its various attributes
        function updateUser(userId, user){
            return $http.put("/api/project/user/"+userId,user);
        }

        function makeAdmin(userId, user){
            return $http.post("/api/project/admin/"+userId);
        }
    }
})();
