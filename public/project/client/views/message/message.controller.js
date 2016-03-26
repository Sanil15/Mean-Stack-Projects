/**
 * Created by Sanil on 3/9/2016.
 */
(function (){
    angular
        .module("CarPoolApp")
        .controller("MessageController",MessageController);

    function MessageController($location, UserService, MessageService){

        var vm = this;

        vm.createMessage=createMessage;
        vm.deleteMessage=deleteMessage;
        vm.updateMessage=updateMessage;
        vm.selectMessage=selectMessage;


        function init() {
            vm.selectedMessageId=-1;

            UserService.findAllUsers()
                .then(function (response){
                    console.log(response.data);
                    vm.userList=response.data;
                });

            MessageService.findAllMessages()
                .then(function (response){
                    vm.messages=response.data;
                    vm.msg=null;
                    vm.selectedMessage=null;
                    vm.selectedMessageId=-1;
                });

        }

        init();


        function createMessage(message){

            MessageService.createMessage(message)
                .then(function (response){
                    vm.messages=response.data;
                    vm.msg=null;
                    vm.selectedMessage=null;
                    vm.selectedMessageId=-1;
            });
        }

        function deleteMessage(index){

            MessageService.deleteMessageById(vm.messages[index]._id)
                .then(function (response){
                    vm.messages=response.data;
                    vm.msg=null;
                    vm.selectedMessage=null;
                    vm.selectedMessageId=-1;
                });
        }

        function selectMessage(index) {
            var a;

            vm.selectedMessageId = vm.messages[index]._id;

            var msg = {
                "message": vm.messages[index].message,
                "fromUser": vm.messages[index].fromUser,
                "toUser": vm.messages[index].toUser
            }

            vm.selectedMessage = msg;
            console.log(vm.selectedMessageId);
        }

        function updateMessage(msg){
            MessageService.updateMessageById(vm.selectedMessageId,msg)
                .then(function (response){
                    vm.messages=response.data;
                    vm.msg=null;
                    vm.selectedMessage=null;
                    vm.selectedMessageId=-1;
                });
        }

    }
})();