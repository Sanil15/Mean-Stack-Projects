/**
 * Created by Sanil on 3/16/2016.
 */
var mongoose=require('mongoose');
// load the promise library
var q = require("q");

module.exports = function(db,app){

    var FormSchema= require("./form.schema.server")();
    var Form = mongoose.model("Form",FormSchema);

    var FieldModel = require("./field.model.server")(db, Form);
    var fieldService= require("../services/field.service.server.js")(app,FieldModel);

    var api = {
        findFormByTitle:findFormByTitle,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormById: findFormById,

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
                {$set: {
                    "title": newForm.title
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