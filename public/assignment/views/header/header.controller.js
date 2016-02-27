/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController)

    function HeaderController($scope, UserService, $rootScope){

        UserService.setCurrentUser(null);
        $scope.checkRootScope=checkRootScope;
        $scope.logout=logout;
        $scope.checkAdmin=checkAdmin;

        // function to check the $rootScope current user
        function checkRootScope(){
            if(UserService.getCurrentUser() == null)
                return true;

            else{
                $scope.username=UserService.getCurrentUser().username;
                return false;
            }
        }

        // function to check whether current user is admin
        function checkAdmin(){
            if(UserService.getCurrentUser() != null) {
                for (var i = 0; i < UserService.getCurrentUser().roles.length; i++){
                    if (UserService.getCurrentUser().roles[i] == "admin")
                        return true;
                }
            }

            return false;
        }

        // function to logout current user
        function logout(){
            UserService.setCurrentUser(null);
        }

    }

})();