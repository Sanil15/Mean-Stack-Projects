/**
 * Created by Sanil on 3/18/2016.
 */
module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/form/:formId/field",findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeFieldFromForm);
    app.post("/api/assignment/form/:formId/field",createNewFieldForForm);
    app.put("/api/assignment/form/:formId", updateFieldForForm);

    function findAllFieldsForForm(req,res){
        var formId = req.params.formId;
        formModel
            .findAllFieldsForForm(formId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .findFieldByIdForForm(formId,fieldId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeFieldFromForm(){

    }

    function createNewFieldForForm(){

    }

    function updateFieldForForm(){

    }

}