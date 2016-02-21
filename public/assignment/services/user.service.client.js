/**
 * Created by Sanil on 2/19/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService(){
        var currentUsers = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var api = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
         };

        return api;

        function findUserByUsernameAndPassword(username, password, callback){
            for(var i=0; i<currentUsers.length;i++) {
                if (username == currentUsers[i].username && password == currentUsers[i].password) {
                    callback(currentUsers[i]);
                    }
                }

                    callback(null);

        }

        function findAllUsers(callback){
            callback(currentUsers);
        }

        function createUser(user, callback){
            currentUsers.push(user);
               console.log(currentUsers);
            callback(user);
        }

        function deleteUserById(userId, callback){

            var i;

            for(i=0;i<currentUsers.length;i++)
            {
                if(currentUsers[i]._id==userId)
                    break;
            }

            currentUsers.splice(i,1);

        }

        function updateUser(userId, user, callback){

            var i;
            for( i=0;i<currentUsers.length;i++)
            {
                if(currentUsers[i]._id==userId)
                break;
            }

            currentUsers[i].firstName = user.firstName;
            currentUsers[i].lastName = user.lastName;
            currentUsers[i].password = user.password;
            currentUsers[i].username = user.username;

            callback(currentUsers[i]);
        }

    }
})();
