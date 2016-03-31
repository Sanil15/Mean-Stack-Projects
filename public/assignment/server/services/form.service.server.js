/**
 * Created by Sanil on 3/17/2016.
 */
module.exports = function(app, formModel, userModel){
    app.get("/api/assignment/user/:userId/form",getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsByUserId(req,res){
        var userId = req.params.userId;
        //console.log("Form For User"+userId);
        formModel.findAllFormsForUser(userId)
            .then(
                function (doc) {
                    //console.log("Forms"+doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormById(req,res){
        var frmId= req.params.formId;
        formModel.findFormById(frmId)
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
        formModel.deleteFormById(frmId)
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

        formModel.createFormForUser(form,userId)
            .then(
                function (doc) {
                    //console.log("HERE 1"+doc);
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

        formModel.updateFormById(formId,form)
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