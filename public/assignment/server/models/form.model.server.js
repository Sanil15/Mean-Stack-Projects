/**
 * Created by Sanil on 3/16/2016.
 */
var mock= require("./form.mock.json");

// load the promise library
var q = require("q");

module.exports = function(){

    var api = {
        findFormByTitle:findFormByTitle,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormById: findFormById,

        // fields
        findAllFieldsForForm:findAllFieldsForForm,
        findFieldByIdForForm:findFieldByIdForForm,
        deleteFieldByIdForForm: deleteFieldByIdForForm,
        createFieldForForm: createFieldForForm
    }

    return api;

    // function finds form by title

    function findFormByTitle(title){
        var deferred = q.defer();
        var form=null;

        for(var u in mock){
            if(mock[u].title==title) {
                form = mock[u];
                break;
            }
        }
        deferred.resolve(form);
        return deferred.promise;

    }

    //
    function findFormById(id){
        var deferred = q.defer();
        var form=null;

        for(var u in mock){
            if(mock[u]._id==id) {
                form = mock[u];
                break;
            }
        }

        deferred.resolve(form);
        return deferred.promise;
    }


    // function to create forms for a user
    function createFormForUser(form, userId){
        var deferred = q.defer();

        form._id=(new Date).getTime();
        form.userId=userId;
        mock.push(form);

        var forms=mock;
        deferred.resolve(forms);
        return deferred.promise;
    }


    // functions finds forms of all users
    function findAllFormsForUser(userId){
        var deferred = q.defer();

        var userForms=[];
        for(var i=0;i<mock.length;i++){
            if(mock[i].userId == userId){
                userForms.push(mock[i]);
            }
        }
        console.log("FORM MODEL"+userForms);
        deferred.resolve(userForms);
        return deferred.promise;
    }

    // function to delete form by id
    function deleteFormById(formId){
        var deferred = q.defer();

        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == formId)
                mock.splice(i,1);

        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    // function updates the form by its id
    function updateFormById(formId,newForm){
        var deferred = q.defer();
        console.log("NEWFORM-TITLE"+newForm.title);
        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == formId) {
                mock[i].title=newForm.title;
                console.log("Update Done"+mock[i].title);
                //currentForms[i].userId=newForm.userId;
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findAllFieldsForForm(formId){
        var deferred = q.defer();
        var form=null;

        for(var u in mock){
            if(mock[u]._id==formId) {
                form = mock[u];
                break;
            }
        }
        deferred.resolve(form.fields);
        return deferred.promise;
    }

    function findFieldByIdForForm(formId,fieldId){
        var deferred = q.defer();
        var form=null;

        for(var u in mock){
            if(mock[u]._id==formId) {
                form = mock[u];
                break;
            }
        }

        var fieldSelect=null;
        for(var i in form.fields){
            if(form.fields[i]._id==fieldId){
                fieldSelect=form.fields[i];
            }
        }

        deferred.resolve(fieldSelect);
        return deferred.promise;
    }

    function deleteFieldByIdForForm(formId,fieldId){
        var deferred = q.defer();
        var form=null;

        for(var u in mock){
            if(mock[u]._id==formId) {
                form = mock[u];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id==fieldId){
                form.fields.splice(i,1);
            }
        }

        deferred.resolve(form);
        return deferred.promise;
    }


    function createFieldForForm(formId,field){
        var deferred = q.defer();
        var form=null;

        for(var u in mock){
            if(mock[u]._id==formId) {
                form = mock[u];
                break;
            }
        }

        field._id=(new Date).getTime();

        form.fields.push(field);

        deferred.resolve(form);
        return deferred.promise;
    }

    function updateFieldForForm(formId,fieldId,field){
        var deferred = q.defer();
        var form=null;


        for(var u in mock){
            if(mock[u]._id==formId) {
                form = mock[u];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id==fieldId){
                form.fields[i]= field;
                break;
            }
        }

        deferred.resolve(form);
        return deferred.promise

    }
}