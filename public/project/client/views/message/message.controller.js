/**
 * Created by Sanil on 3/9/2016.
 */
(function (){
    angular
        .module("CarPoolApp")
        .controller("MessageController",MessageController);

    function MessageController($scope, $location, UserService, MessageService){

        $scope.createMessage=createMessage;
        $scope.deleteMessage=deleteMessage;
        $scope.updateMessage=updateMessage;
        $scope.selectMessage=selectMessage;
        $scope.selectedMessageId=-1;


        UserService.findAllUsers(renderUser);
        MessageService.findAllMessages(renderMessages);

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

        function createMessage(){
            //console.log($scope.msg);
            MessageService.createMessage($scope.msg,renderMessages);
        }

        function deleteMessage(index){
            var a;
            MessageService.findAllMessages(getList);
            function getList(list){
                a=list;
            }
            MessageService.deleteMessageById(a[index]._id,renderMessages);
        }

        function selectMessage(index) {
            var a;
            MessageService.findAllMessages(getList);
            function getList(list) {
                a = list;
            }

            $scope.selectedMessageId = a[index]._id;

            var msg = {
                "message": a[index].message,
                "fromUser": a[index].fromUser,
                "toUser": a[index].toUser
            }

            $scope.selectedMessage = msg;
        }

        function updateMessage(){
            MessageService.updateMessageById($scope.selectedMessageId,$scope.selectedMessage,renderMessages);
        }

    }
})();