/**
 * Created by Sanil on 3/17/2016.
 */
module.exports = function(app, formModel, userModel){
    app.get("/api/assignment/user/:userId/form",getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.put(" /api/assignment/form/:formId", updateFormById);

    function getFormsByUserId(req,res){
        var userId = req.params.userId;
        userModel.getFormsByUserId(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormById(req,res){
        var frmId= req.params.formId;
        userModel.getFormById(frmId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req,res){
        var frmId= req.params.formId;
        userModel.deleteFormById(frmId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req,res){
        var userId= req.params.userId;
        var form= req.body;

        userModel.createFormForUser(form,userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req,res){
        var formId=req.params.formId;
        var form=req.body;

        userModel.updateFormById(formId,form)
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