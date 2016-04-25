/**
 * Created by Sanil on 3/23/2016.
 */
var mongoose=require('mongoose');

// load the promise library
var q = require("q");

module.exports = function() {

    var MessageSchema = require("./message.schema.server.js")();
    var MessageModel = mongoose.model("MessageModel",MessageSchema)


    var api = {
        createMessage: createMessage,
        findAllMessages: findAllMessages,
        findAllMessagesForUser: findAllMessagesForUser,
        deleteMessageById: deleteMessgaeById,
        updateMessageById: updateMessageById,
        findMessageById: findMessageById,
        deleteMessgaeByIdForOtherUser: deleteMessgaeByIdForOtherUser
    };

    return api;

    function findAllMessages(){
        var deferred = q.defer();
        MessageModel
            .find(
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function findMessageById(messageId){
        var deferred = q.defer();
        MessageModel
            .findById(messageId,
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                });
        return deferred.promise;

    }

    function createMessage(message){
        var deferred = q.defer();
        MessageModel
            .create(message,
                function (err, stats){
                    if(!err) {

                        deferred.resolve(stats);
                    }
                    else{
                        console.log(err);
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function findAllMessagesForUser(userName){
        var deferred = q.defer();
        MessageModel
            .find(
                {
                    $or:
                    [
                        { $and: [{ fromUser: userName}, {visibleFromUser: true}]},
                        { $and: [{ toUser: userName}, {  visibleToUser: true}]}
                    ]
                 },
                function (err, applications) {
                    if (!err) {
                        deferred.resolve (applications);
                    } else {
                        deferred.reject (err);
                    }
                }
            );
        return deferred.promise;
    }

    function deleteMessgaeById(messageId){
        var deferred = q.defer();
        MessageModel
            .update(
                {_id: messageId},
                {$set: {
                    "visibleFromUser": false
                }},
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function deleteMessgaeByIdForOtherUser(messageId){
        var deferred = q.defer();
        MessageModel
            .update(
                {_id: messageId},
                {$set: {
                    "visibleToUser": false
                }},
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function updateMessageById(messageId,mes){
        var deferred = q.defer();
        MessageModel
            .update(
                {_id: messageId},
                {$set: {
                    "toUser": false
                }},
                function (err, stats){
                    if(!err) {
                        deferred.resolve(stats);
                    }
                    else{
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

}