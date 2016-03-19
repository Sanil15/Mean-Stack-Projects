/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController)

    function HeaderController(UserService,$location){

        var vm= this;

        vm.checkRootScope=checkRootScope;
        vm.checkAdmin=checkAdmin;
        vm.logout=logout;

        function init(){
            vm.$location=$location;
        }

        init();


        // function to check the $rootScope current user
        function checkRootScope(){
            if(UserService.getCurrentUser() == null)
                return true;

            else{
                vm.username=UserService.getCurrentUser().username;
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
            console.log()
            vm.username=null;
        }

    }

})();