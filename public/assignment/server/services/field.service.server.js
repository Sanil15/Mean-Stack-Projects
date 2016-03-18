/**
 * Created by Sanil on 3/18/2016.
 */
module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeFieldFromForm);
    app.post("/api/assignment/form/:formId/field",createNewFieldForForm);
    app.put("/api/assignment/form/:formId", updateFieldForForm);

    function getFieldsByFormId(){

    }

    function getFieldByFieldIdFormId(){

    }

    function removeFieldFromForm(){

    }

    function createNewFieldForForm(){

    }

    function updateFieldForForm(){

    }

}