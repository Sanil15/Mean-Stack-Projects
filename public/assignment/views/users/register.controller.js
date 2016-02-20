/**
 * Created by Sanil on 2/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController)

        function RegisterController($scope, UserService, $location){

            $scope.register=registerFunction;

            function registerFunction(username,password,confirmPassword,email){
            var user;

                if(password==confirmPassword)
                {
                user={"_id": (new Date).getTime() , "firstName":null,"lastName":null,
                             "username":username,  "password":password,   "roles": null};

                UserService.createUser(user, render);
                }



                function render (user) {
                    $rootScope = user;
                    console.log(user);
                    $location.path("/profile");
                }
            }

        }

})();