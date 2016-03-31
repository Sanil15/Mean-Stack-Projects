/**
 * Created by Sanil on 3/16/2016.
 */
var mongoose=require('mongoose');
// load the promise library
var q = require("q");

module.exports = function(db){

    var FormSchema= require("./form.schema.server")();
    var Form = mongoose.model("Form",FormSchema);

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
        createFieldForForm: createFieldForForm,
        updateFieldByIdForForm: updateFieldByIdForForm
    }

    return api;

    // function finds form by title

    function findFormByTitle(title){
        var deferred = q.defer();
        Form
            .findOne(
                {title: title},
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

    function findFormById(id){
        var deferred = q.defer();
        Form
            .findById(id,
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


    // function to create forms for a user
    function createFormForUser(form, userId){
        var deferred = q.defer();
        form.userId=userId;

        Form.create(form, function (err, stats){
            if(!err) {
                deferred.resolve(stats);
            }
            else{
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }


    // functions finds forms of all users
    function findAllFormsForUser(userId){
        var deferred = q.defer();
        Form
            .find(
                {userId: userId},
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

    // function to delete form by id
    function deleteFormById(formId){
        return Form.remove().where("_id").equals(formId);
    }

    // function updates the form by its id
    function updateFormById(formId,newForm){
        var deferred = q.defer();
        Form
            .update(
                {_id: formId},
                {$set: newForm},
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


    function findAllFieldsForForm(formId){
        return Form.findById(formId).select("fields");
    }

    function findFieldByIdForForm(formId,fieldId){
        return Form.findById(formId)
                .then(function(form){
                return form.fields.id(fieldId);
                });
    }

    function deleteFieldByIdForForm(formId,fieldId){
        return Form.findById(formId)
            .then(function (form){
                form.fields.id(fieldId).remove();
                return form.save();
            });
    }


    function createFieldForForm(formId,field){
       return Form.findById(formId)
           .then(function(form){
              form.fields.push(field);
              return form.update(form);
           });
    }

    function updateFieldByIdForForm(formId,fieldId,field){
       return Form.findById(formId)
           .then(function(form){
              var fieldOld= form.fields.id(fieldId);
              fieldOld.label=field.label;
              fieldOld.placeholder=field.placeholder;
              fieldOld.options=field.options;
              return form.save();
           });
    }
}