/**
 * Created by Sanil on 3/9/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .factory("MessageService",MessageService);

    function MessageService($http){

        var api = {
            createMessage: createMessage,
            findAllMessages: findAllMessages,
            findAllMessagesForUser: findAllMessagesForUser,
            deleteMessageById: deleteMessgaeById,
            updateMessageById: updateMessageById
        };

        return api;

        function findAllMessages(){
            return $http.get("/api/project/message");
        }

        function createMessage(message){
            return $http.post("/api/project/message",message);
        }

        function findAllMessagesForUser(username){
            return $http.get("/api/project/message?userName="+username);
        }

        function deleteMessgaeById(messageId, which){
            return $http.delete("/api/project/message/"+messageId+"?which="+which);
        }

        function updateMessageById(messageId,mes){
            return $http.put("/api/project/message/"+messageId,mes);
        }


    }

})();