/**
 * Created by Sanil on 3/16/2016.
 */
var mock= require("./user.mock.json");

// load the promise library
var q = require("q");

module.exports = function(){

    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,

        findUserById: findUserById,
        findAllUsers : findAllUsers,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser
    }

    return api;


    function findUserByCredentials(credentials){

        var deferred = q.defer();
        var user=null;

        for(var u in mock){
            if( mock[u].username === credentials.username && mock[u].password === credentials.password) {
                user= mock[u];
                break;
            }
        }

        deferred.resolve(user);

        return deferred.promise;
    }


    function findUserByUsername(username){

        var deferred = q.defer();
        var user=null;

        for(var u in mock){
            if(mock[u].username === username){
                user= mock[u];
            }
        }

        deferred.resolve(user);

        return deferred.promise;
    }


    // function returns all set of users
    function findAllUsers(){
        var deferred = q.defer();
        var users=mock;

        deferred.resolve(users);
        return deferred.promise;
    }

    // function creates a set of users
    function createUser(user){

        var deferred = q.defer();
        user._id = (new Date()).getTime();
        mock.push(user);

        var users=mock;

        deferred.resolve(users);
        return deferred.promise;
    }

    // function to find the id
    function findUserById(id){
        var deferred = q.defer();
        var user=null;
        for(var u in mock){
            if(mock[u].username === username)
                user=mock[u];

        }
        deferred.resolve(user);
        return deferred.promise;
    }

    // function deletes a user by userId
    function deleteUserById(userId){
        var deferred = q.defer();
        var i=0;
        for(var u in mock){
            i++;
            if(mock[u]._id==userId)
            break;
        }

        mock.splice(i,1);
        var users=mock;
        deferred.resolve(users);
        return deferred.promise;

    }


    // function to update a user and its various attributes
    function updateUser(userId, user){
        var deferred = q.defer();

        var i;
        for( i=0;i<mock.length;i++) {
            if(mock[i]._id==userId)
                break;
        }

        mock[i].firstName = user.firstName;
        mock[i].lastName = user.lastName;
        mock[i].password = user.password;
        mock[i].username = user.username;

        var user=mock[i];
        deferred.resolve(user);
        return deferred.promise;

    }

}