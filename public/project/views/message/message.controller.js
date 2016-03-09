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

        UserService.findAllUsers(renderUser);
        MessageService.findAllMessages(renderMessages);

        function renderUser(list){
            //console.log(list);
            $scope.userList=list;
        }

        function renderMessages(list){
            $scope.messages=list;
            $scope.msg=null;

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

    }
})();