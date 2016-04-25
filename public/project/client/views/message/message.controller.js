 /**
 * Created by Sanil on 3/9/2016.
 */
(function (){
    angular
        .module("CarPoolApp")
        .controller("MessageController",MessageController);

    function MessageController($location, UserService, MessageService, $scope){

        var vm = this;

        vm.createMessage=createMessage;
        vm.deleteMessage=deleteMessage;
        vm.updateMessage=updateMessage;
        vm.selectMessage=selectMessage;
        vm.loadConversation=loadConversation;
        vm.createNew = createNew;
        vm.send = send;
        vm.disconnect=disconnect;
        vm.del = del;

        var socket=null;

        function init() {
            vm.selectedMessageId=-1;
            vm.delSelect = -1;

            $('.scrolling').css('max-height',$(window).height());

            $(function(){
                if ($('#ms-menu-trigger')[0]) {
                    $('body').on('click', '#ms-menu-trigger', function() {
                        $('.ms-menu').toggleClass('toggled');
                    });
                }
            });

            UserService.findAllUsers()
                .then(function (response){
                    vm.userList=response.data;
                });


            UserService.getCurrentUser()
                .then(function(response){
                    if(response.data) {
                        vm.currentUser = response.data;
                        return MessageService.findAllMessagesForUser(response.data.username);
                    }
                })
                .then(function (response) {

                        var msgList=response.data;

                        var userList = [];

                        for(var i=0;i<msgList.length;i++)
                        {
                            userList.push(msgList[i].fromUser);
                            userList.push(msgList[i].toUser);
                        }

                        var uniqUser = userList.reduce(function(a,b){
                            if (a.indexOf(b) < 0 ) a.push(b);
                            return a;
                        },[]);

                        for(var i =0; i< uniqUser.length ;i++)
                        {

                            if(uniqUser[i] == vm.currentUser.username){
                                uniqUser.splice(i,1);
                            }
                        }
                        vm.users=uniqUser;
                        vm.convs=response.data;

                })

            if ($location.absUrl().indexOf("localhost") > -1) {
                socket = io();
            }
            else{
                socket=io("http://webdev2016-jainsanil.rhcloud.com:8000");
            }

            UserService.getCurrentUser()
                .then(function(response){
                    socket.emit('create',response.data.username);
                    socket.on('chat',function(message){
                        console.log("RECEIVE");
                        console.log(message);
                        vm.mymsg = message;
                        $scope.$apply();
                    });
                })

        }

        init();


        function del(){

            if(vm.delSelect == -1)
            vm.delSelect = 1;

            else
            vm.delSelect = -1;

            loadConversation(vm.selectedUser);
        }

        function send(message){
            socket.emit("chat", message);
        }

        function disconnect(){
            socket.emit('disconnect');
        }

        function createNew(message){

            message.fromUser=vm.currentUser.username;
            message.toUser=vm.selectedUser;
            send(message);

            MessageService.createMessage(message)
                .then(function (response){
                    return MessageService.findAllMessagesForUser(vm.currentUser.username);
                }).then(function(resposne){
                    vm.convs=resposne.data;
                    send(message);
                    vm.newMessage = null;
                    loadConversation(vm.selectedUser);
                });

        }

        function createMessage(message){
            MessageService.createMessage(message)
                .then(function (response){
                    return MessageService.findAllMessages();
                })
                .then(function (response){
                    vm.messages=response.data;
                    vm.msg=null;
                    vm.selectedMessage=null;
                    vm.selectedMessageId=-1;
                });
        }

        function deleteMessage(message){
            var which;
            if(message.fromUser == vm.currentUser.username)
            which = "from";

            else
            which = "to";

            MessageService.deleteMessageById(message._id,which)
                .then(function (response){
                    return MessageService.findAllMessagesForUser(vm.currentUser.username);
                }).then(function(resposne){
                vm.convs=resposne.data;
                loadConversation(vm.selectedUser);
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

            if(vm.selectedMessage) {
                MessageService.findAllMessagesForUser(vm.selectedMessage.fromUser)
                    .then(function (response) {

                        var msgList=response.data;

                        var userList = [];

                        for(var i=0;i<msgList.length;i++)
                        {
                            userList.push(msgList[i].fromUser);
                            userList.push(msgList[i].toUser);
                        }

                        var uniqUser = userList.reduce(function(a,b){
                            if (a.indexOf(b) < 0 ) a.push(b);
                            return a;
                        },[]);

                        vm.users=uniqUser;
                        vm.convs=response.data;
                    })
            }
        }

        function loadConversation(user){


            vm.selectedUser=user;
            var conversation = [];
            for(var i=0;i<vm.convs.length;i++){
                if(vm.convs[i].fromUser == user || vm.convs[i].toUser == user){
                    conversation.push(vm.convs[i]);
                }
            }
            vm.conversation = conversation;
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