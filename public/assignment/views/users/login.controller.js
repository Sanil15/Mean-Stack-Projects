/**
 * Created by Sanil on 2/18/2016.
 */
(function () {
    angular.module("FormBuilderApp")
           .controller("LoginController",LoginController);

    function LoginController($scope, UserService, $location){

        $scope.login=loginFunction;

        function loginFunction(username,password){
            console.log(username,password);
            UserService.findUserByUsernameAndPassword(username,password,render);
        }

        function render (user) {
            if(user != null)
            {
                $rootScope=user;
                console.log(user);
                $location.path("/profile");
            }

        }
    }

})();