/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController)

    function SidebarController($scope, UserService){

        $scope.checkLogin=checkLogin;
        $scope.checkAdmin=checkAdmin;

        // function to check login of a current User
        function checkLogin(){
            if(UserService.getCurrentUser() == null)
                return false;

            else
                return true;
        }

        // function to check whether current user is Admin
        function checkAdmin(){
            if (UserService.getCurrentUser() != null){
                for (var i = 0; i < UserService.getCurrentUser().roles.length; i++){
                    if (UserService.getCurrentUser().roles[i] == "admin")
                        return true;
                }
            }
            return false;
        }

    }

})();