/**
 * Created by Sanil on 2/18/2016.
 */
(function () {

    'use strict'

    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController)

    function AdminController(UserService, $location, $scope, $filter){

        var vm = this;

        vm.Sort = Sort;
        vm.select = select;
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.add=add;

        vm.index = -1;

        $scope.firstNameBottom = 0;
        $scope.lastNameBottom = 0;
        $scope.userNameBottom = 0;


        function init(){
            vm.selectedUserId=null;
            vm.selectedUser=null;

            UserService
                .adminFindAllUsers()
                .then(function(response){
                        if(response.data){
                            vm.users=response.data;
                            Sort("username",0);
                        }},
                    function (err) {
                        vm.error = "You Do Not Have Admin Priveleges";
                    }
                );

        }
        init();

        function Sort(prop,dir){

            if(prop == "username"){
                if(dir == 0){
                    $scope.userNameBottom = -1;
                    dir = 1;
                }
                else{
                    $scope.userNameBottom = -1 * dir;
                }
                $scope.lastNameBottom = 0;
                $scope.firstNameBottom = 0;

            }

            else if(prop == "firstName"){
                if(dir == 0){
                    $scope.firstNameBottom = -1;
                    dir = 1;
                }
                else{
                    $scope.firstNameBottom = -1 * dir;
                }
                $scope.lastNameBottom = 0;
                $scope.userNameBottom = 0;

            }

            else if(prop == "lastName"){
                if(dir == 0){
                    $scope.lastNameBottom = -1;
                    dir = 1;
                }
                else{
                    $scope.lastNameBottom = -1 * dir;
                }
                $scope.firstNameBottom = 0;
                $scope.userNameBottom = 0;

            }

            vm.users.sort( predicatBy(prop, dir));
        }

        function predicatBy(prop, dir){

            return function(a,b){
                if( a[prop] > b[prop]){
                    return dir;
                }else if( a[prop] < b[prop] ){
                    return -1*dir;
                }
                return 0;
            }
        }


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
            if(vm.selectedUserId)
                UserService
                    .adminUpdateUser(vm.selectedUserId,user)
                    .then(function(response){
                        if(response)
                            init();
                        else
                            vm.error="Error in Updation";
                    })

        }

        function deleteUser(user){
            console.log(user);
            UserService
                .adminDeleteUserById(user._id)
                .then(function(response){
                    if(response.data)
                        init();
                });
        }

        function add(user){
            if(user)
            {
                UserService
                    .adminCreateUser(user)
                    .then(function(response){
                            if(response) {
                                init();
                            }
                            else
                                vm.error="USERNAME ALREADY EXISTS!!!!!";
                        }
                    );
            }
        }
    }
})();