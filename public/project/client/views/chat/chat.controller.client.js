/**
 * Created by Sanil on 4/8/2016.
 */
(function(){

    'use strict'

    angular
        .module("CarPoolApp")
        .controller("ChatController",ChatController)

    function ChatController($location,UserService,$scope){

        var vm=this;
        var socket=null;
        vm.send = send;
        vm.disconnect=disconnect;

        function init() {

            if ($location.absUrl().indexOf("localhost") > -1) {
            socket = io();
            console.log("INITIALIZED");
            }
            else{
                socket=io("http://webdev2016-jainsanil.rhcloud.com:8000");
            }

            UserService.findAllUsers()
                .then(function (response){
                    console.log(response.data);
                    vm.userList=response.data;
                });
            console.log(UserService.getCurrentUser());
            socket.emit('create',UserService.getCurrentUser().username);
            socket.on('chat',function(message){
                console.log("RECEIVE");
                console.log(message);
                vm.mymsg = message;
                $scope.$apply();
            });

        }
        init();

        function send(message){
            console.log(message);
            socket.emit("chat", message);
        }

        function disconnect(){
            socket.emit('disconnect');
        }
    }

})();