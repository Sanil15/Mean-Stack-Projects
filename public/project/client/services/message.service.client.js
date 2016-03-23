/**
 * Created by Sanil on 3/9/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("MessageService",MessageService);

    function MessageService(){

        var messageList = [
            {"_id": "000", "message": "Hi Wassup!!!", "fromUser": "Alice123", "toUser": "Bob_Hope", },
            {"_id": "010", "message": "Hey, How you doin?", "fromUser": "Bob_Hope", "toUser": "CharlieCool"},
            {"_id": "020", "message": "Hey Hello", "fromUser": "CharlieCool", "toUser": "Alice123"}
        ];

        var api = {
            createMessage: createMessage,
            findAllMessages: findAllMessages,
            findAllMessagesForUser: findAllMessagesForUser,
            deleteMessageById: deleteMessgaeById,
            updateMessageById: updateMessageById
        };

        return api;

        function findAllMessages(callback){
            callback(messageList);
        }

        function createMessage(message, callback){
            message._id=(new Date).getTime();
            messageList.push(message);
            callback(messageList);
        }

        function findAllMessagesForUser(userName, callback){
            var userMessages=[];
            for(var i=0;i<messageList.length;i++){
                if(messageList[i].toUser == userName){
                    userMessages.push(userMessages[i]);
                }
            }
            callback(userMessages);
        }

        function deleteMessgaeById(messageId,callback){
            for(var i=0;i<messageList.length;i++) {
                if(messageList[i]._id == messageId)
                {
                    messageList.splice(i,1);
                }
            }
            callback(messageList);
        }

        function updateMessageById(messageId,mes,callback){
            for(var i=0;i<messageList.length;i++) {
                if(messageList[i]._id == messageId) {
                    messageList[i].message=mes.message;
                    //currentForms[i].userId=newForm.userId;
                    break;
                }
            }
            callback(messageList);
        }


    }

})();