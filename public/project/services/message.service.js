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
            {"_id": "000", "message": "Hi Wassup!!!", "fromUser": 123, "toUser": 111},
            {"_id": "010", "message": "Hey, How you doin?", "fromUser": 123, "toUser": 111},
            {"_id": "020", "message": "Hey Hello", "fromUser": 234, "toUser": 111}
        ];

        var api = {
            createMessage: createMessage,
            findAllMessages: findAllMessages,
            findAllMessagesForUser: findAllMessagesForUser,
            deleteMessageById: deleteMessgaeById,
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

        function findAllMessagesForUser(userId, callback){
            var userMessages=[];
            for(var i=0;i<messageList.length;i++){
                if(messageList[i].toUser == userId){
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


    }

})();