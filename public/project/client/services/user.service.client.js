/**
 * Created by Sanil on 2/19/2016.
 */
(function () {

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("UserService",UserService);

    function UserService($rootScope){

        var api = {
            findUserByEmailAndPassword : findUserByEmailAndPassword,
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

        // function to find Email and Password
        function findUserByEmailAndPassword(email, password, callback){
            for(var i=0; i<currentUsers.length;i++) {
                if (email == currentUsers[i].email && password == currentUsers[i].password) {
                    callback(currentUsers[i]);
                    }
                }
            callback(null);
        }

        // function returns all set of users
        function findAllUsers(callback){
            callback(currentUsers);
        }

        // function creates a set of users
        function createUser(user, callback){
            currentUsers.push(user);
               console.log(currentUsers);
            callback(user);
        }

        // function deletes a user by userId
        function deleteUserById(userId, callback){
            var i;
            for(i=0;i<currentUsers.length;i++) {
                if(currentUsers[i]._id==userId)
                    break;
            }
            currentUsers.splice(i,1);
        }


        // function to update a user and its various attributes
        function updateUser(userId, user, callback){
            var i;
            for( i=0;i<currentUsers.length;i++) {
                if(currentUsers[i]._id==userId)
                break;
            }

            currentUsers[i].firstName = user.firstName;
            currentUsers[i].lastName = user.lastName;
            currentUsers[i].password = user.password;
            currentUsers[i].email = user.email;
            currentUsers[i].address=user.address;
            currentUsers[i].city=user.city;
            currentUsers[i].contact=user.contact;
            currentUsers[i].dob=user.dob;
            currentUsers[i].zipCode=user.zipCode;

            callback(currentUsers[i]);
        }
    }
})();
