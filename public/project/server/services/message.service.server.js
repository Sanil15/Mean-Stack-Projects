/**
 * Created by Sanil on 3/23/2016.
 */
module.exports = function(app, messageModel, userModel) {

    app.get("/api/project/message/:messageId", getMessageById);

    app.get("/api/project/message", getAllMessages);

    app.delete("/api/project/message/:messageId", deleteMessageById);

    app.post("/api/project/message", createMessageByUser);

    app.put("/api/project/message/:messageId", updateMessageById);

    function getMessageById(req,res){
        var messageId=req.params.messageId;

        messageModel.findMessageById(messageId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllMessages(req,res){

        var userName=req.query.userName;

        if(userName!=null){
            getMessageForUser(req,res);
        }

        else {
            messageModel.findAllMessages()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }
    }

    function getMessageForUser(req,res){

        var userName=req.query.userName;
        console.log("Yes"+userName);
        messageModel.findAllMessagesForUser(userName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessageById(req,res){

        var messageId=req.params.messageId;

        messageModel.deleteMessageById(messageId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessageByUser(req,res){

        var message=req.body;

        messageModel.createMessage(message)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateMessageById(req,res){
        var messageId=req.params.messageId;
        var message=req.body;
        messageModel.updateMessage(messageId,message)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}