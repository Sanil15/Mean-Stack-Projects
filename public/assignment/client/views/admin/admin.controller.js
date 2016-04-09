/**
 * Created by Sanil on 2/18/2016.
 */
(function () {

    'use strict'

    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController)

    function AdminController(UserService, $location){

        var vm = this;
        vm.select = select;
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.add=add;

        function init(){
            vm.selectedUserId=null;
            vm.selectedUser=null;
            UserService
                .adminFindAllUsers()
                .then(function(response){
                    if(response.data){
                        vm.users=response.data;
                    }
                });
        }
        init();

        function select(user){
            vm.selectedUserId=user._id;
            vm.selectedUser={};
            vm.selectedUser.username=user.username;
            vm.selectedUser.password=user.password;
            vm.selectedUser.firstName=user.firstName;
            vm.selectedUser.lastName=user.lastName;
            vm.selectedUser.roles=user.roles;
        }

        function update(user){
            UserService
                .adminUpdateUser(vm.selectedUserId,user)
                .then(
                    function(response){
                        if(response.data)
                        init();
                    }
                );
        }

        function deleteUser(user){
            UserService
                .adminDeleteUserById(user._id)
                .then(function(response){
                    if(response.data)
                    init();
                });
        }

        function add(user){
            console.log(user);
            UserService
                .adminCreateUser(user)
                .then(function(response){
                        if(response.data)
                            return UserService.adminFindAllUsers();
                    }
                )
                .then(function(response){
                        if(response.data){
                            vm.users=response.data;
                            vm.selectedUser=null;
                            vm.selectedUserId=null;
                        }
                    }
                );
        }
    }
})();