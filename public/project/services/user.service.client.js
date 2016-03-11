/**
 * Created by Sanil on 2/19/2016.
 */
(function () {

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("UserService",UserService);

    function UserService($rootScope){
        var currentUsers = [
            {	"_id":123, "firstName":"Alice",  "lastName":"Wonderland",
                "email":"alice@abc.com",    "password":"alice",   "roles": ["general","admin"], "userName": "Alice123" ,
                "dob":"13/03/193", "country":"USA", "state": "IL", "city": "Chicago",
                "address": "Medical Destrict Apartments", "zipCode":"02110", "contact":"+1 098-764-4334"                                                  },
            {	"_id":234, "firstName":"Bob",     "lastName":"Hope", "userName": "Bob_Hope",
                "email":"bob@gmail.com",    "password":"bob",     "roles": ["admin"],
                "dob":"1/1/1991", "country":"Uganda", "state": "PL", "city": "Polise",
                "address": "State Street", "zipCode":"09020", "contact":"+0 9102029281"                                                  },
            {	"_id":345, "firstName":"Charlie", "lastName":"Brown","userName": "CharlieCool",
                "email":"charlie@yahoo.com","password":"charlie", "roles": ["general"],
                "dob":"2/4/1983", "country":"USA", "state": "MA", "city": "Maine",
                "address": "Stephen Street", "zipCode":"02220", "contact":"+1 876-300-8688"                                                   },
        ];

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
