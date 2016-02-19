/**
 * Created by Sanil on 2/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController)

        $scope.register=registerFunction;

        function RegisterController($scope, UserService, $location){

            function registerFunction(username,password,confirmPassword,email){

                if(password==confirmPassword)
                {

                }
            }

        }

})();