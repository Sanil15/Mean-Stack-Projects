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
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser
         };

        return api;

        // Setter function to set the $rootScope of current user
        function setCurrentUser (user) {
            $rootScope.user = user;
        }

        // Getter function to get the $rootScope of current user
        function getCurrentUser () {
            return $rootScope.user;
        }

        // function to find Username and Password
        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user?"+"username=" + username + "&password=" + password);
        }

        // function returns all set of users
        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        // function creates a set of users
        function createUser(user){
           return $http.post("/api/assignment/user",user);
        }

        // function deletes a user by userId
        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/"+userId);
        }


        // function to update a user and its various attributes
        function updateUser(userId,user){
            return $http.put("/api/assignment/user/"+userId,user);
        }

    }


})();
