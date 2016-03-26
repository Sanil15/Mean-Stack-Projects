/**
 * Created by Sanil on 3/23/2016.
 */
var mock= require("./message.mock.json");

// load the promise library
var q = require("q");

module.exports = function() {

    var api = {
        createMessage: createMessage,
        findAllMessages: findAllMessages,
        findAllMessagesForUser: findAllMessagesForUser,
        deleteMessageById: deleteMessgaeById,
        updateMessageById: updateMessageById,
        findMessageById: findMessageById
    };

    return api;

    function findAllMessages(){
        var deferred = q.defer();
        var messages=mock;
        console.log("YES");
        deferred.resolve(mock);
        return deferred.promise;
    }

    function findMessageById(messageId){
        var deferred = q.defer();
        var msg=null;
        for(var i=0;i<mock.length;i++) {

            if(mock[i]._id == messageId)
            {
                msg=mock[i];
                break;
            }
        }

        deferred.resolve(msg);
        return deferred.promise;
    }

    function createMessage(message){
        var deferred = q.defer();

        message._id=(new Date).getTime();
        mock.push(message);

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findAllMessagesForUser(userName){
        var deferred = q.defer();

        var userMessages=[];
        for(var i=0;i<mock.length;i++){
            if(mock[i].toUser == userName){
                userMessages.push(mock[i]);
            }
        }
        deferred.resolve(userMessages);
        return deferred.promise;
    }

    function deleteMessgaeById(messageId){
        var deferred = q.defer();

        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == messageId)
            {
                mock.splice(i,1);
                break;
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    function updateMessageById(messageId,mes){
        var deferred= q.defer();
        console.log(messageId+" :: "+mes.message);
        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == messageId) {
                mock[i].message=mes.message;
                break;
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

}