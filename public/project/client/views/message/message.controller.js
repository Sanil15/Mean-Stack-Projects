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
                    vm.userList=list;
                });

            MessageService.findAllMessages
                .then(function (response){
                    vm.messages=list;
                    vm.msg=null;
                    vm.selectedMessage=null;
                    vm.selectedMessageId=-1;
                });

        }

        init();





        function renderUser(list){
            //console.log(list);
            $scope.userList=list;
        }

        function renderMessages(list){
            $scope.messages=list;
            $scope.msg=null;
            $scope.selectedMessage=null;
            $scope.selectedMessageId=-1;

        }

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
            var a;
            MessageService.findAllMessages()
                .then(function (response) {
                    a=response.data;
                });

            MessageService.deleteMessageById(a[index]._id)
                .then(function (response){
                    vm.messages=response.data;
                    vm.msg=null;
                    vm.selectedMessage=null;
                    vm.selectedMessageId=-1;
                });
        }

        function selectMessage(index) {
            var a;
            MessageService.findAllMessages()
                .then(function (response) {
                    a=response.data;
                });

            vm.selectedMessageId = a[index]._id;

            var msg = {
                "message": a[index].message,
                "fromUser": a[index].fromUser,
                "toUser": a[index].toUser
            }

            vm.selectedMessage = msg;
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